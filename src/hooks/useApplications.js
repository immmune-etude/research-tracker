import { useState, useEffect, useCallback } from "react";
import { SEED_APPLICATIONS } from "../data/programs";

const STORAGE_KEY = "research_tracker_data_v1";

function mergeSeeds(stored) {
  const next = { ...stored };
  let changed = false;
  for (const [id, seed] of Object.entries(SEED_APPLICATIONS)) {
    if (!next[id]) {
      next[id] = structuredClone(seed);
      changed = true;
    } else if (!next[id].checklist) {
      next[id] = {
        ...next[id],
        checklist: { ...seed.checklist },
      };
      changed = true;
    }
  }
  return { next, changed };
}

export function useApplications() {
  const [applications, setApplications] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let stored = {};
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) stored = JSON.parse(raw) || {};
    } catch {
      /* ignore corrupt storage */
    }
    const { next, changed } = mergeSeeds(stored);
    setApplications(next);
    if (changed) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* quota / private mode */
      }
    }
    setLoading(false);
  }, []);

  const persist = useCallback((next) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* quota / private mode */
    }
  }, []);

  const updateApp = useCallback(
    (programId, updates) => {
      setApplications((prev) => {
        const current = prev[programId] || structuredClone(SEED_APPLICATIONS[programId]) || {};
        const merged = { ...current, ...updates };

        if (
          updates.status &&
          ["submitted", "interviewing", "accepted"].includes(updates.status) &&
          !merged.dateApplied
        ) {
          merged.dateApplied = new Date().toISOString().slice(0, 10);
        }

        const next = { ...prev, [programId]: merged };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const toggleChecklist = useCallback(
    (programId, key) => {
      setApplications((prev) => {
        const current = prev[programId] || structuredClone(SEED_APPLICATIONS[programId]) || {};
        const checklist = {
          ...(current.checklist || {}),
          [key]: !current.checklist?.[key],
        };
        const next = { ...prev, [programId]: { ...current, checklist } };
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const exportData = useCallback(() => {
    const blob = new Blob([JSON.stringify(applications, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `research-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [applications]);

  const importData = useCallback(
    (file) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result);
          if (parsed && typeof parsed === "object") {
            const { next } = mergeSeeds(parsed);
            setApplications(next);
            persist(next);
          }
        } catch {
          alert("Could not import that file — make sure it’s a valid backup JSON.");
        }
      };
      reader.readAsText(file);
    },
    [persist]
  );

  const resetAll = useCallback(() => {
    if (!confirm("Clear all application progress? This cannot be undone.")) return;
    const fresh = structuredClone(SEED_APPLICATIONS);
    setApplications(fresh);
    persist(fresh);
  }, [persist]);

  return {
    applications,
    loading,
    updateApp,
    toggleChecklist,
    exportData,
    importData,
    resetAll,
  };
}
