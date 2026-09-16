import { useState } from "react";
import {
  STATUS_OPTIONS,
  CHECKLIST_KEYS,
  isApplicationOpen,
  hasApplicationClosed,
  todayISO,
} from "../data/programs";

function StatusBadge({ value }) {
  const s = STATUS_OPTIONS.find((o) => o.value === value) || STATUS_OPTIONS[0];
  return (
    <span className="status-badge" style={{ "--status": s.color }}>
      {s.label}
    </span>
  );
}

function FitChip({ fit }) {
  const cls =
    fit === "Strong fit" ? "fit-strong" : fit === "Good fit" ? "fit-good" : "fit-explore";
  return <span className={`chip ${cls}`}>{fit}</span>;
}

function OpenBadge({ program }) {
  const today = todayISO();
  if (isApplicationOpen(program, today)) {
    return <span className="chip chip-open">Open now</span>;
  }
  if (hasApplicationClosed(program, today)) {
    return <span className="chip chip-closed">Closed</span>;
  }
  return <span className="chip chip-soon">Opens {program.opensLabel}</span>;
}

export default function ProgramCard({
  program,
  appData,
  onUpdate,
  onToggleChecklist,
  forceOpen,
}) {
  const [expanded, setExpanded] = useState(false);
  const open = forceOpen || expanded;
  const status = appData.status || "not_started";
  const checklist = appData.checklist || {};
  const doneCount = CHECKLIST_KEYS.filter((c) => checklist[c.key]).length;

  return (
    <article
      className={`program-card ${program.fit === "Strong fit" ? "priority" : ""} ${open ? "open" : ""}`}
    >
      <button
        type="button"
        className="card-header"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={open}
      >
        <div className="card-main">
          <div className="card-title-row">
            <h2>{program.name}</h2>
            <OpenBadge program={program} />
            <FitChip fit={program.fit} />
            {program.source === "added" && (
              <span className="chip chip-added">Added for you</span>
            )}
          </div>
          <div className="card-meta">
            <span className="cat-pill">{program.category}</span>
            <span>{program.org}</span>
            <span className="dot">·</span>
            <span>{program.location}</span>
          </div>
          <p className="card-summary">{program.summary}</p>
          <p className="card-deadline">
            <strong>Opens:</strong> {program.opensLabel}
            <span className="dot"> · </span>
            <strong>Deadline:</strong> {program.closesLabel}
          </p>
        </div>
        <div className="card-side">
          <StatusBadge value={status} />
          <span className="checklist-mini">
            Materials {doneCount}/{CHECKLIST_KEYS.length}
          </span>
          <span className="expand-hint">{open ? "Less" : "More"}</span>
        </div>
      </button>

      {open && (
        <div className="card-body">
          <div className="info-grid">
            <div>
              <h3>Why this fits you</h3>
              <p>{program.whyFit}</p>
            </div>
            <div>
              <h3>Benefits</h3>
              <p>{program.benefits}</p>
              <h3>Duration</h3>
              <p>{program.duration}</p>
            </div>
          </div>

          <div className="info-block">
            <h3>Requirements</h3>
            <p>{program.requirements}</p>
            {program.dateNote && (
              <>
                <h3>Date note</h3>
                <p>{program.dateNote}</p>
              </>
            )}
          </div>

          <div className="checklist">
            <h3>Application materials</h3>
            <div className="checklist-row">
              {CHECKLIST_KEYS.map((item) => (
                <label key={item.key} className="check-item">
                  <input
                    type="checkbox"
                    checked={!!checklist[item.key]}
                    onChange={() => onToggleChecklist(item.key)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="tracker-fields">
            <label>
              <span>Application status</span>
              <select
                value={status}
                onChange={(e) => onUpdate({ status: e.target.value })}
                onClick={(e) => e.stopPropagation()}
              >
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Date applied / submitted</span>
              <input
                type="date"
                value={appData.dateApplied || ""}
                onChange={(e) => onUpdate({ dateApplied: e.target.value })}
                onClick={(e) => e.stopPropagation()}
              />
            </label>
          </div>

          <label className="notes-field">
            <span>Notes</span>
            <textarea
              value={appData.notes || ""}
              onChange={(e) => onUpdate({ notes: e.target.value })}
              onClick={(e) => e.stopPropagation()}
              placeholder="Mentor contacts, essay drafts, LOR ask dates, eligibility quirks…"
              rows={3}
            />
          </label>

          <a
            className="apply-link"
            href={program.applyUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            Open application / program page
            <span aria-hidden>→</span>
          </a>
        </div>
      )}
    </article>
  );
}
