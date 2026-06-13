"use client";

import type { ChangeEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { ResultAd } from "@/components/ads/AdPlaceholders";
import {
  cricketOversToDecimalOvers,
  validateCricketOvers,
} from "@/lib/cricket/overs";

type TeamRow = {
  id: string;
  name: string;
  played: string;
  wins: string;
  losses: string;
  noResults: string;
  points: string;
  runsScored: string;
  oversFaced: string;
  runsConceded: string;
  oversBowled: string;
};

type RankedTeam = TeamRow & {
  nrr: number | null;
  rank: number;
  validationErrors: string[];
};

const storageKey = "rkbsports:points-table-calculator";

const inputClass =
  "input-glow w-full rounded border border-slate-300 bg-white px-2 py-2 text-sm text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 dark:border-sport-border dark:bg-sport-dark dark:text-white dark:focus:border-sport-primary dark:focus:ring-emerald-950";

const buttonClass =
  "btn-glow rounded bg-emerald-600 px-4 py-2 text-sm font-black text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-sport-primary dark:text-sport-dark dark:hover:bg-emerald-300";

const secondaryButtonClass =
  "btn-glow rounded border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:border-sport-border dark:text-slate-200 dark:hover:border-sport-primary dark:hover:text-sport-primary";

function createTeam(name = ""): TeamRow {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name,
    played: "0",
    wins: "0",
    losses: "0",
    noResults: "0",
    points: "0",
    runsScored: "0",
    oversFaced: "",
    runsConceded: "0",
    oversBowled: "",
  };
}

function numberValue(value: string) {
  const number = Number(value || "0");
  return Number.isFinite(number) ? number : 0;
}

function formatNrr(value: number | null) {
  if (value === null) {
    return "N/A";
  }

  return `${value >= 0 ? "+" : ""}${value.toFixed(3)}`;
}

function validateNumber(label: string, value: string) {
  if (!value.trim()) {
    return `${label} is required.`;
  }

  const number = Number(value);
  if (!Number.isFinite(number)) {
    return `${label} must be a valid number.`;
  }

  if (number < 0) {
    return `${label} cannot be negative.`;
  }

  return null;
}

function calculateNrr(team: TeamRow) {
  if (!team.oversFaced.trim() || !team.oversBowled.trim()) {
    return null;
  }

  const facedValidation = validateCricketOvers(team.oversFaced);
  const bowledValidation = validateCricketOvers(team.oversBowled);

  if (!facedValidation.isValid || !bowledValidation.isValid) {
    return null;
  }

  const oversFaced = cricketOversToDecimalOvers(team.oversFaced);
  const oversBowled = cricketOversToDecimalOvers(team.oversBowled);

  if (oversFaced === 0 || oversBowled === 0) {
    return null;
  }

  return numberValue(team.runsScored) / oversFaced - numberValue(team.runsConceded) / oversBowled;
}

function validateTeam(team: TeamRow) {
  const errors = [
    validateNumber("Matches played", team.played),
    validateNumber("Wins", team.wins),
    validateNumber("Losses", team.losses),
    validateNumber("No results", team.noResults),
    validateNumber("Points", team.points),
    validateNumber("Runs scored", team.runsScored),
    validateNumber("Runs conceded", team.runsConceded),
  ].filter(Boolean) as string[];

  if (team.oversFaced.trim()) {
    const validation = validateCricketOvers(team.oversFaced);
    if (!validation.isValid) {
      errors.push(`Overs faced: ${validation.error}`);
    } else if (cricketOversToDecimalOvers(team.oversFaced) === 0 && numberValue(team.runsScored) > 0) {
      errors.push("Overs faced must be greater than zero when runs scored are entered.");
    }
  }

  if (team.oversBowled.trim()) {
    const validation = validateCricketOvers(team.oversBowled);
    if (!validation.isValid) {
      errors.push(`Overs bowled: ${validation.error}`);
    } else if (cricketOversToDecimalOvers(team.oversBowled) === 0 && numberValue(team.runsConceded) > 0) {
      errors.push("Overs bowled must be greater than zero when runs conceded are entered.");
    }
  }

  return errors;
}

function rankTeams(teams: TeamRow[]): RankedTeam[] {
  return teams
    .map((team) => ({
      ...team,
      nrr: calculateNrr(team),
      rank: 0,
      validationErrors: validateTeam(team),
    }))
    .sort((a, b) => {
      const pointsDiff = numberValue(b.points) - numberValue(a.points);
      if (pointsDiff !== 0) return pointsDiff;

      const nrrDiff = (b.nrr ?? Number.NEGATIVE_INFINITY) - (a.nrr ?? Number.NEGATIVE_INFINITY);
      if (nrrDiff !== 0) return nrrDiff;

      const winsDiff = numberValue(b.wins) - numberValue(a.wins);
      if (winsDiff !== 0) return winsDiff;

      return a.name.localeCompare(b.name);
    })
    .map((team, index) => ({ ...team, rank: index + 1 }));
}

function exportRows(rows: RankedTeam[]) {
  return [
    "RKBSports.app Points Table",
    "Rank | Team | P | W | L | NR | Pts | NRR",
    ...rows.map((team) =>
      [
        team.rank,
        team.name || "Unnamed team",
        team.played,
        team.wins,
        team.losses,
        team.noResults,
        team.points,
        formatNrr(team.nrr),
      ].join(" | "),
    ),
  ].join("\n");
}

export function PointsTableCalculator() {
  const [teams, setTeams] = useState<TeamRow[]>([]);
  const [teamName, setTeamName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTeams([createTeam()]);
  }, []);

  const rankedTeams = useMemo(() => rankTeams(teams), [teams]);
  const hasValidationErrors = rankedTeams.some((team) => team.validationErrors.length > 0);

  function addTeam() {
    const nextName = teamName.trim();
    setTeams((current) => [...current, createTeam(nextName)]);
    setTeamName("");
    setMessage(nextName ? "Team added." : "Blank team row added.");
  }

  function updateTeam(id: string, field: keyof TeamRow, value: string) {
    setTeams((current) =>
      current.map((team) => {
        if (team.id !== id) {
          return team;
        }

        const nextTeam = { ...team, [field]: value };

        if (field === "wins" || field === "noResults") {
          nextTeam.points = String(numberValue(nextTeam.wins) * 2 + numberValue(nextTeam.noResults));
        }

        return nextTeam;
      }),
    );
  }

  function handleNumberChange(id: string, field: keyof TeamRow) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      updateTeam(id, field, event.target.value);
    };
  }

  function deleteTeam(id: string) {
    setTeams((current) => current.filter((team) => team.id !== id));
    setMessage("Team deleted.");
  }

  function saveTable() {
    window.localStorage.setItem(storageKey, JSON.stringify({ teams, savedAt: new Date().toISOString() }));
    setMessage("Table saved on this device.");
  }

  function loadTable() {
    try {
      const rawValue = window.localStorage.getItem(storageKey);
      const parsed = rawValue ? (JSON.parse(rawValue) as { teams?: TeamRow[] }) : null;

      if (!parsed?.teams || !Array.isArray(parsed.teams)) {
        setMessage("No saved table found on this device.");
        return;
      }

      setTeams(parsed.teams);
      setMessage("Saved table loaded.");
    } catch {
      setMessage("Saved table could not be loaded.");
    }
  }

  function clearSavedTable() {
    window.localStorage.removeItem(storageKey);
    setMessage("Saved table cleared from this device.");
  }

  async function copyTable() {
    const text = exportRows(rankedTeams);

    try {
      await navigator.clipboard.writeText(text);
      setMessage("Table copied as text.");
    } catch {
      setMessage("Copy is unavailable in this browser.");
    }
  }

  function downloadJson() {
    const blob = new Blob([JSON.stringify({ teams, exportedAt: new Date().toISOString() }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "rkbsports-points-table.json";
    link.click();
    URL.revokeObjectURL(url);
    setMessage("JSON backup downloaded.");
  }

  return (
    <div className="mt-8 space-y-6">
      <section className="glass-card rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              Custom points table creator
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
              Add teams and enter tournament stats manually. Saved only on this device.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={saveTable} className={buttonClass}>Save Table</button>
            <button type="button" onClick={loadTable} className={secondaryButtonClass}>Load Saved</button>
            <button type="button" onClick={clearSavedTable} className={secondaryButtonClass}>Clear Saved</button>
            <button type="button" onClick={copyTable} className={secondaryButtonClass}>Copy Text</button>
            <button type="button" onClick={downloadJson} className={secondaryButtonClass}>Download JSON</button>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="new-team-name" className="sr-only">Team name</label>
          <input
            id="new-team-name"
            value={teamName}
            onChange={(event) => setTeamName(event.target.value)}
            className={inputClass}
            placeholder="Team name"
          />
          <button type="button" onClick={addTeam} className={buttonClass}>Add Team</button>
        </div>

        {message ? (
          <p className="mt-3 text-sm font-bold text-emerald-700 dark:text-sport-primary">{message}</p>
        ) : null}

        {hasValidationErrors ? (
          <div className="mt-4 rounded border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
            Some rows need attention. Invalid overs such as 4.6 are rejected, and zero-over division is avoided.
          </div>
        ) : null}
      </section>

      <section className="glass-card rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-sport-border dark:bg-sport-card">
        <h2 className="px-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
          Team stats
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-[980px] border-separate border-spacing-y-2 text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              <tr>
                <th className="px-2 py-2">Team</th>
                <th className="px-2 py-2">P</th>
                <th className="px-2 py-2">W</th>
                <th className="px-2 py-2">L</th>
                <th className="px-2 py-2">NR</th>
                <th className="px-2 py-2">Pts</th>
                <th className="px-2 py-2">Runs For</th>
                <th className="px-2 py-2">Overs For</th>
                <th className="px-2 py-2">Runs Against</th>
                <th className="px-2 py-2">Overs Against</th>
                <th className="px-2 py-2">NRR</th>
                <th className="px-2 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => {
                const ranked = rankedTeams.find((row) => row.id === team.id);
                return (
                  <tr key={team.id} className="align-top">
                    <td className="rounded-l bg-slate-50 px-2 py-2 dark:bg-sport-dark">
                      <input aria-label="Team name" value={team.name} onChange={(event) => updateTeam(team.id, "name", event.target.value)} className={inputClass} placeholder="Team name" />
                    </td>
                    <td className="bg-slate-50 px-2 py-2 dark:bg-sport-dark"><input aria-label="Matches played" value={team.played} onChange={handleNumberChange(team.id, "played")} className={inputClass} inputMode="numeric" /></td>
                    <td className="bg-slate-50 px-2 py-2 dark:bg-sport-dark"><input aria-label="Wins" value={team.wins} onChange={handleNumberChange(team.id, "wins")} className={inputClass} inputMode="numeric" /></td>
                    <td className="bg-slate-50 px-2 py-2 dark:bg-sport-dark"><input aria-label="Losses" value={team.losses} onChange={handleNumberChange(team.id, "losses")} className={inputClass} inputMode="numeric" /></td>
                    <td className="bg-slate-50 px-2 py-2 dark:bg-sport-dark"><input aria-label="No results" value={team.noResults} onChange={handleNumberChange(team.id, "noResults")} className={inputClass} inputMode="numeric" /></td>
                    <td className="bg-slate-50 px-2 py-2 dark:bg-sport-dark"><input aria-label="Points" value={team.points} onChange={handleNumberChange(team.id, "points")} className={inputClass} inputMode="numeric" /></td>
                    <td className="bg-slate-50 px-2 py-2 dark:bg-sport-dark"><input aria-label="Runs scored" value={team.runsScored} onChange={handleNumberChange(team.id, "runsScored")} className={inputClass} inputMode="numeric" /></td>
                    <td className="bg-slate-50 px-2 py-2 dark:bg-sport-dark"><input aria-label="Overs faced" value={team.oversFaced} onChange={handleNumberChange(team.id, "oversFaced")} className={inputClass} placeholder="20" /></td>
                    <td className="bg-slate-50 px-2 py-2 dark:bg-sport-dark"><input aria-label="Runs conceded" value={team.runsConceded} onChange={handleNumberChange(team.id, "runsConceded")} className={inputClass} inputMode="numeric" /></td>
                    <td className="bg-slate-50 px-2 py-2 dark:bg-sport-dark"><input aria-label="Overs bowled" value={team.oversBowled} onChange={handleNumberChange(team.id, "oversBowled")} className={inputClass} placeholder="20" /></td>
                    <td className="bg-slate-50 px-2 py-2 font-black text-emerald-800 dark:bg-sport-dark dark:text-sport-primary">
                      {formatNrr(ranked?.nrr ?? null)}
                      {ranked?.validationErrors.length ? (
                        <p className="mt-1 max-w-40 text-xs font-semibold leading-5 text-amber-700 dark:text-amber-300">
                          {ranked.validationErrors[0]}
                        </p>
                      ) : null}
                    </td>
                    <td className="rounded-r bg-slate-50 px-2 py-2 dark:bg-sport-dark">
                      <button type="button" onClick={() => deleteTeam(team.id)} className="btn-glow rounded px-2 py-1 text-xs font-black text-red-700 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-950/50">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="glass-card rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
          <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
            Ranked table
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="py-2 pr-3">Rank</th>
                  <th className="py-2 pr-3">Team</th>
                  <th className="py-2 pr-3">P</th>
                  <th className="py-2 pr-3">W</th>
                  <th className="py-2 pr-3">L</th>
                  <th className="py-2 pr-3">NR</th>
                  <th className="py-2 pr-3">Pts</th>
                  <th className="py-2 pr-3">NRR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-sport-border">
                {rankedTeams.map((team) => (
                  <tr key={team.id}>
                    <td className="py-3 pr-3 font-black">{team.rank}</td>
                    <td className="py-3 pr-3 font-bold">{team.name || "Unnamed team"}</td>
                    <td className="py-3 pr-3">{team.played}</td>
                    <td className="py-3 pr-3">{team.wins}</td>
                    <td className="py-3 pr-3">{team.losses}</td>
                    <td className="py-3 pr-3">{team.noResults}</td>
                    <td className="py-3 pr-3 font-black">{team.points}</td>
                    <td className="py-3 pr-3 font-black text-emerald-800 dark:text-sport-primary">{formatNrr(team.nrr)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ResultAd />
      </section>
    </div>
  );
}
