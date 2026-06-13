"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  addSavedTeam,
  clearSavedTeams,
  deleteSavedTeam,
  readSavedTeams,
  type SavedTeam,
} from "@/lib/teams/savedTeams";

export function SavedTeams() {
  const [teamName, setTeamName] = useState("");
  const [teams, setTeams] = useState<SavedTeam[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTeams(readSavedTeams());
  }, []);

  function saveTeam(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!teamName.trim()) {
      setMessage("Enter a team name to save.");
      return;
    }

    setTeams(addSavedTeam(teamName));
    setTeamName("");
    setMessage("Team saved locally.");
  }

  function removeTeam(id: string) {
    setTeams(deleteSavedTeam(id));
    setMessage("Team removed.");
  }

  function removeAllTeams() {
    setTeams(clearSavedTeams());
    setMessage("All saved teams removed from this device.");
  }

  return (
    <section className="glass-card rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
      <div className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-wide text-emerald-700 dark:text-sport-primary">
          Saved Teams
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
          Local team names for future tools
        </h2>
        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
          Save team names on this device only. No login, database, live data, or
          external service is used.
        </p>
        <p className="mt-2 text-sm font-bold text-slate-500 dark:text-slate-400">
          Saved only on this device.
        </p>
      </div>

      <form onSubmit={saveTeam} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="saved-team-name" className="sr-only">
          Team name
        </label>
        <input
          id="saved-team-name"
          value={teamName}
          onChange={(event) => setTeamName(event.target.value)}
          placeholder="Team name"
          className="input-glow min-h-11 flex-1 rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 dark:border-sport-border dark:bg-sport-dark dark:text-white dark:focus:border-sport-primary dark:focus:ring-emerald-950"
        />
        <button
          type="submit"
          className="btn-glow rounded bg-emerald-600 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-sport-primary dark:text-sport-dark dark:hover:bg-emerald-300"
        >
          Save Team
        </button>
      </form>

      {message ? (
        <p className="mt-3 text-sm font-bold text-emerald-700 dark:text-sport-primary">
          {message}
        </p>
      ) : null}

      {teams.length > 0 ? (
        <>
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={removeAllTeams}
              className="btn-glow rounded border border-red-200 px-3 py-2 text-xs font-black text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/50"
            >
              Clear All Teams
            </button>
          </div>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((team) => (
              <li
                key={team.id}
                className="card-lift flex items-center justify-between gap-3 rounded border border-slate-200 bg-slate-50 px-3 py-2 dark:border-sport-border dark:bg-sport-dark"
              >
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {team.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeTeam(team.id)}
                  className="btn-glow rounded px-2 py-1 text-xs font-black text-red-700 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/50"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-5 text-sm text-slate-600 dark:text-slate-300">
          No saved teams yet.
        </p>
      )}
    </section>
  );
}
