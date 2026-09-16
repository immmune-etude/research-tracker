import { useMemo, useRef, useState } from "react";
import {
  PROGRAMS,
  STATUS_OPTIONS,
  CATEGORY_FILTERS,
  FIT_FILTERS,
  isApplicationOpen,
  hasApplicationClosed,
  todayISO,
} from "./data/programs";
import ProgramCard from "./components/ProgramCard";
import { useApplications } from "./hooks/useApplications";
import "./App.css";

const FIT_ORDER = { "Strong fit": 0, "Good fit": 1, Explore: 2 };

function sortPrograms(list, sortBy, applications) {
  const statusOrder = Object.fromEntries(STATUS_OPTIONS.map((s, i) => [s.value, i]));
  const copy = [...list];

  if (sortBy === "opens") {
    return copy.sort(
      (a, b) =>
        (a.opensOn || "9999").localeCompare(b.opensOn || "9999") ||
        a.name.localeCompare(b.name)
    );
  }
  if (sortBy === "deadline") {
    return copy.sort(
      (a, b) =>
        (a.closesOn || "9999").localeCompare(b.closesOn || "9999") ||
        a.name.localeCompare(b.name)
    );
  }
  if (sortBy === "name") {
    return copy.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortBy === "status") {
    return copy.sort((a, b) => {
      const sa = applications[a.id]?.status || "not_started";
      const sb = applications[b.id]?.status || "not_started";
      return (statusOrder[sa] ?? 0) - (statusOrder[sb] ?? 0);
    });
  }
  return copy.sort((a, b) => {
    const fa = FIT_ORDER[a.fit] ?? 9;
    const fb = FIT_ORDER[b.fit] ?? 9;
    if (fa !== fb) return fa - fb;
    return (a.opensOn || "").localeCompare(b.opensOn || "") || a.name.localeCompare(b.name);
  });
}

function ProgramSection({ title, subtitle, programs, applications, updateApp, toggleChecklist, expandAll }) {
  if (programs.length === 0) {
    return (
      <section className="program-section">
        <div className="section-head">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <p className="empty section-empty">None right now — check back as portals open.</p>
      </section>
    );
  }

  return (
    <section className="program-section">
      <div className="section-head">
        <h2>
          {title}
          <span className="section-count">{programs.length}</span>
        </h2>
        <p>{subtitle}</p>
      </div>
      <div className="list">
        {programs.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
            appData={applications[program.id] || {}}
            onUpdate={(updates) => updateApp(program.id, updates)}
            onToggleChecklist={(key) => toggleChecklist(program.id, key)}
            forceOpen={expandAll}
          />
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const {
    applications,
    loading,
    updateApp,
    toggleChecklist,
    exportData,
    importData,
    resetAll,
  } = useApplications();
  const [category, setCategory] = useState("All");
  const [fit, setFit] = useState("All");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("opens");
  const [query, setQuery] = useState("");
  const [expandAll, setExpandAll] = useState(false);
  const fileRef = useRef(null);
  const today = todayISO();

  const stats = useMemo(() => {
    const values = Object.values(applications);
    return {
      not_started: values.filter((a) => (a.status || "not_started") === "not_started").length,
      in_progress: values.filter((a) => a.status === "in_progress").length,
      submitted: values.filter((a) => a.status === "submitted").length,
      interviewing: values.filter((a) => a.status === "interviewing").length,
      accepted: values.filter((a) => a.status === "accepted").length,
    };
  }, [applications]);

  const filtered = useMemo(() => {
    return PROGRAMS.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (fit !== "All" && p.fit !== fit) return false;
      const app = applications[p.id] || {};
      const status = app.status || "not_started";
      if (statusFilter !== "all" && status !== statusFilter) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = `${p.name} ${p.org} ${p.summary} ${p.tags.join(" ")} ${p.location}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [category, fit, statusFilter, query, applications]);

  const { openNow, notYetOpen, closed } = useMemo(() => {
    const open = [];
    const upcoming = [];
    const done = [];
    for (const p of filtered) {
      if (isApplicationOpen(p, today)) open.push(p);
      else if (hasApplicationClosed(p, today)) done.push(p);
      else upcoming.push(p);
    }
    return {
      openNow: sortPrograms(open, sortBy, applications),
      notYetOpen: sortPrograms(upcoming, sortBy === "fit" ? "opens" : sortBy, applications),
      closed: sortPrograms(done, sortBy, applications),
    };
  }, [filtered, sortBy, applications, today]);

  const addedCount = PROGRAMS.filter((p) => p.source === "added").length;
  const listCount = PROGRAMS.filter((p) => p.source === "list").length;
  const nextOpens = [...PROGRAMS]
    .filter((p) => p.opensOn && p.opensOn > today)
    .sort((a, b) => a.opensOn.localeCompare(b.opensOn))[0];

  if (loading) {
    return (
      <div className="shell loading">
        <p>Loading your research tracker…</p>
      </div>
    );
  }

  return (
    <div className="shell">
      <header className="hero-panel">
        <div className="hero-top">
          <div className="brand-mark">
            <span className="orb" aria-hidden />
            Portal · Research
          </div>
          <div className="hero-actions">
            <button type="button" className="btn-ghost-light" onClick={exportData}>
              Export
            </button>
            <button
              type="button"
              className="btn-ghost-light"
              onClick={() => fileRef.current?.click()}
            >
              Import
            </button>
            <button
              type="button"
              className="btn-solid"
              onClick={() => setExpandAll((v) => !v)}
            >
              {expandAll ? "Collapse all" : "Expand all"}
            </button>
          </div>
        </div>
        <div className="hero-copy">
          <p className="brand">Research Tracker</p>
          <h1>Summer research applications for Eddy · UCLA MCDB</h1>
          <p className="lede">
            Split by what’s open now vs what’s coming. {openNow.length} open ·{" "}
            {notYetOpen.length} not yet open
            {nextOpens ? (
              <>
                {" "}
                · Next up: <strong>{nextOpens.name}</strong> ({nextOpens.opensLabel})
              </>
            ) : null}
            . Built for <strong>Summer 2027</strong>.
          </p>
        </div>
      </header>

      <div className="stats">
        {[
          { key: "not_started", label: "Not started", value: stats.not_started },
          { key: "in_progress", label: "In progress", value: stats.in_progress },
          { key: "submitted", label: "Submitted", value: stats.submitted },
          { key: "interviewing", label: "Interviewing", value: stats.interviewing },
          { key: "accepted", label: "Accepted", value: stats.accepted },
        ].map((s) => (
          <button
            key={s.key}
            type="button"
            className={`stat ${statusFilter === s.key ? "active" : ""}`}
            onClick={() => setStatusFilter((cur) => (cur === s.key ? "all" : s.key))}
          >
            <span className="stat-label">{s.label}</span>
            <span className="stat-value">{s.value}</span>
          </button>
        ))}
      </div>

      <div className="controls">
        <div className="search-wrap">
          <input
            type="search"
            placeholder="Search programs, orgs, tags…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search programs"
          />
        </div>

        <div className="filter-row">
          <div className="pills" role="group" aria-label="Category">
            {CATEGORY_FILTERS.map((c) => (
              <button
                key={c}
                type="button"
                className={`pill ${category === c ? "on" : ""}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-row">
          <div className="pills" role="group" aria-label="Fit">
            {FIT_FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={`pill ${fit === f ? "on" : ""}`}
                onClick={() => setFit(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="control-actions">
            <label className="sort-label">
              Sort
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="opens">Open date</option>
                <option value="deadline">Deadline</option>
                <option value="fit">Best fit</option>
                <option value="status">Status</option>
                <option value="name">Name</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="toolbar">
        <p className="result-count">
          Showing <strong>{filtered.length}</strong> of {PROGRAMS.length} (
          {listCount} from your list · {addedCount} added) · as of {today}
        </p>
        <div className="toolbar-actions">
          <button type="button" className="ghost danger" onClick={resetAll}>
            Reset progress
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) importData(file);
              e.target.value = "";
            }}
          />
        </div>
      </div>

      <ProgramSection
        title="Open now"
        subtitle="Applications are currently accepting submissions."
        programs={openNow}
        applications={applications}
        updateApp={updateApp}
        toggleChecklist={toggleChecklist}
        expandAll={expandAll}
      />

      <ProgramSection
        title="Not yet open"
        subtitle="Portals open on the dates below — prep materials early."
        programs={notYetOpen}
        applications={applications}
        updateApp={updateApp}
        toggleChecklist={toggleChecklist}
        expandAll={expandAll}
      />

      {closed.length > 0 && (
        <ProgramSection
          title="Closed"
          subtitle="Application window has ended for this cycle."
          programs={closed}
          applications={applications}
          updateApp={updateApp}
          toggleChecklist={toggleChecklist}
          expandAll={expandAll}
        />
      )}

      {filtered.length === 0 && (
        <p className="empty">No programs match these filters.</p>
      )}

      <footer className="footer">
        <p>
          Open dates scraped from official program pages (Sep 2026). Some are estimated from the
          prior cycle — always confirm on the program site before applying. Progress saves in this
          browser.
        </p>
      </footer>
    </div>
  );
}
