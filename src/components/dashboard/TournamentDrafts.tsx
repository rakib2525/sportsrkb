"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import {
  addTournamentDraft,
  clearTournamentDrafts,
  deleteTournamentDraft,
  readTournamentDrafts,
  type TournamentDraft,
} from "@/lib/dashboard/tournamentDrafts";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Date not available";
  }
  return date.toLocaleDateString(undefined, { dateStyle: "medium" });
}

export function TournamentDrafts() {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [drafts, setDrafts] = useState<TournamentDraft[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setDrafts(readTournamentDrafts());
  }, []);

  function saveDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      setMessage("Enter a tournament name to save a draft.");
      return;
    }

    setDrafts(addTournamentDraft(name, note));
    setName("");
    setNote("");
    setMessage("Tournament draft saved on this device.");
  }

  function removeDraft(id: string) {
    setDrafts(deleteTournamentDraft(id));
    setMessage("Tournament draft deleted.");
  }

  function clearDrafts() {
    setDrafts(clearTournamentDrafts());
    setMessage("All tournament drafts cleared from this device.");
  }

  return (
    <section className="glass-card rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
      <div className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-wide text-emerald-700 dark:text-sport-primary">
          Saved Tournament Drafts
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
          Local tournament notes
        </h2>
        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
          Save tournament names and short notes for future planning. This is a local foundation only, not a points table database.
        </p>
      </div>

      <form onSubmit={saveDraft} className="mt-5 grid gap-4">
        <div>
          <label htmlFor="draft-name" className="text-sm font-bold text-slate-700 dark:text-slate-200">
            Tournament name
          </label>
          <input
            id="draft-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="input-glow mt-2 w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 dark:border-sport-border dark:bg-sport-dark dark:text-white dark:focus:border-sport-primary dark:focus:ring-emerald-950"
            placeholder="Tournament name"
          />
        </div>
        <div>
          <label htmlFor="draft-note" className="text-sm font-bold text-slate-700 dark:text-slate-200">
            Basic note
          </label>
          <textarea
            id="draft-note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            className="input-glow mt-2 min-h-24 w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 dark:border-sport-border dark:bg-sport-dark dark:text-white dark:focus:border-sport-primary dark:focus:ring-emerald-950"
            placeholder="Optional note"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="btn-glow rounded bg-emerald-600 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-sport-primary dark:text-sport-dark dark:hover:bg-emerald-300"
          >
            Save Draft
          </button>
          {drafts.length > 0 ? (
            <button
              type="button"
              onClick={clearDrafts}
              className="btn-glow rounded border border-red-200 px-4 py-2 text-sm font-bold text-red-700 transition hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/50"
            >
              Clear All Drafts
            </button>
          ) : null}
        </div>
      </form>

      {message ? (
        <p className="mt-3 text-sm font-bold text-emerald-700 dark:text-sport-primary">
          {message}
        </p>
      ) : null}

      {drafts.length > 0 ? (
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {drafts.map((draft) => (
            <li
              key={draft.id}
              className="card-lift rounded border border-slate-200 bg-slate-50 p-4 dark:border-sport-border dark:bg-sport-dark"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-black text-slate-950 dark:text-white">
                    {draft.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {formatDate(draft.createdAt)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeDraft(draft.id)}
                  className="btn-glow rounded px-2 py-1 text-xs font-black text-red-700 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/50"
                >
                  Delete
                </button>
              </div>
              {draft.note ? (
                <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {draft.note}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 text-sm text-slate-600 dark:text-slate-300">
          No tournament drafts saved yet.
        </p>
      )}
    </section>
  );
}
