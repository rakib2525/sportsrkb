"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { ResultAd } from "@/components/ads/AdPlaceholders";
import { GlossaryTooltip } from "@/components/glossary/GlossaryTooltip";
import {
  ShareVerdictCard,
  type ShareCardData,
} from "@/components/share/ShareVerdictCard";
import { readSavedTeams, type SavedTeam } from "@/lib/teams/savedTeams";
import {
  ballsToCricketOvers,
  cricketOversToBalls,
  cricketOversToDecimalOvers,
  validateCricketOvers,
} from "@/lib/cricket/overs";
import {
  combineValidationResults,
  validateNumericInput,
  validateOversInput,
} from "@/lib/cricket/validation";

type RecentCalculation = {
  id: string;
  summary: string;
  timestamp?: string;
};

type ResultBlock = {
  title: string;
  lines: string[];
  explanation: string;
  shareCard?: ShareCardData;
};

const inputClass =
  "input-glow mt-2 w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 dark:border-sport-border dark:bg-sport-dark dark:text-white dark:focus:border-sport-primary dark:focus:ring-emerald-950";

const buttonClass =
  "btn-glow rounded bg-emerald-600 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-sport-primary dark:text-sport-dark dark:hover:bg-emerald-300";

const secondaryButtonClass =
  "btn-glow rounded border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:border-sport-border dark:text-slate-200 dark:hover:border-sport-primary dark:hover:text-sport-primary";

function formatNumber(value: number, digits = 2) {
  return value.toFixed(digits);
}

function getRecent(key: string): RecentCalculation[] {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as RecentCalculation[]) : [];
  } catch {
    return [];
  }
}

function saveRecent(key: string, summary: string) {
  const next = [
    { id: `${Date.now()}`, summary, timestamp: new Date().toISOString() },
    ...getRecent(key),
  ].slice(0, 5);
  window.localStorage.setItem(key, JSON.stringify(next));
  return next;
}

function OversHint({ value, label }: { value: string; label: string }) {
  const hint = useMemo(() => {
    if (!value.trim()) {
      return "";
    }

    const validation = validateCricketOvers(value);

    if (!validation.isValid) {
      return validation.error ?? `${label} are invalid.`;
    }

    const balls = cricketOversToBalls(value);
    return `${value} overs = ${balls} balls.`;
  }, [label, value]);

  if (!hint) {
    return null;
  }

  return (
    <p className="mt-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
      {hint}
    </p>
  );
}

function FieldLabel({
  htmlFor,
  children,
  tooltip,
}: {
  htmlFor: string;
  children: string;
  tooltip?: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-bold text-slate-700 dark:text-slate-200">
      {children} {tooltip}
    </label>
  );
}

function ResultActions({ result }: { result: ResultBlock | null }) {
  const [message, setMessage] = useState("");
  const shareText = result
    ? `${result.title}\n${result.lines.join("\n")}\n${result.explanation}`
    : "";

  async function copyResult() {
    if (!shareText) {
      return;
    }

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = shareText;
        textarea.setAttribute("readonly", "true");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setMessage("Copied");
    } catch {
      setMessage("Copy unavailable");
    }
  }

  function shareWhatsApp() {
    if (!shareText) {
      return;
    }

    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="mt-5 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={copyResult}
        disabled={!result}
        className={secondaryButtonClass}
      >
        Copy Result
      </button>
      <button
        type="button"
        onClick={shareWhatsApp}
        disabled={!result}
        className={secondaryButtonClass}
      >
        WhatsApp Share
      </button>
      {message ? (
        <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
          {message}
        </span>
      ) : null}
    </div>
  );
}

function RecentCalculations({ items }: { items: RecentCalculation[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="glass-card mt-6 rounded border border-slate-200 bg-slate-50 p-4 dark:border-sport-border dark:bg-sport-dark/70">
      <h3 className="text-sm font-black uppercase tracking-wide text-slate-700 dark:text-slate-200">
        Recent calculations
      </h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {items.map((item) => (
          <li key={item.id}>{item.summary}</li>
        ))}
      </ul>
    </section>
  );
}

function ErrorList({ errors }: { errors: string[] }) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="result-appear mt-5 rounded border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-200">
      {errors.map((error) => (
        <p key={error}>{error}</p>
      ))}
    </div>
  );
}

function CalculatorShell({
  title,
  children,
  result,
  errors,
  recent,
}: {
  title: string;
  children: ReactNode;
  result: ResultBlock | null;
  errors: string[];
  recent: RecentCalculation[];
}) {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="glass-card rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
        <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
          {title}
        </h2>
        {children}
        <ErrorList errors={errors} />
        <RecentCalculations items={recent} />
      </section>

      <aside className="space-y-6">
        <section className="glass-card rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
          <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
            Result
          </h2>
          {result ? (
            <div className="result-appear mt-4 space-y-3">
              <h3 className="text-xl font-black text-emerald-800 dark:text-sport-primary">
                {result.title}
              </h3>
              <dl className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {result.lines.map((line) => {
                  const [label, value] = line.split(": ");
                  return (
                    <div key={line} className="flex justify-between gap-4">
                      <dt className="font-bold">{label}</dt>
                      <dd className="text-right">{value}</dd>
                    </div>
                  );
                })}
              </dl>
              <p className="leading-7 text-slate-700 dark:text-slate-300">
                {result.explanation}
              </p>
            </div>
          ) : (
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              Enter values and calculate to see the result here.
            </p>
          )}
          <ResultActions result={result} />
          {result?.shareCard ? <ShareVerdictCard data={result.shareCard} /> : null}
        </section>
        <ResultAd />
      </aside>
    </div>
  );
}

type RunRateCalculatorProps = {
  storageKey?: string;
  title?: string;
  resultLabel?: string;
  defaultOvers?: string;
  contextNote?: string;
};

export function RunRateCalculator({
  storageKey = "rkbsports:run-rate-recent",
  title = "Run rate calculator",
  resultLabel = "Run Rate",
  defaultOvers = "",
  contextNote = "Use cricket over format such as 4.3 for 4 overs and 3 balls.",
}: RunRateCalculatorProps = {}) {
  const [runs, setRuns] = useState("");
  const [overs, setOvers] = useState(defaultOvers);
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<ResultBlock | null>(null);
  const [recent, setRecent] = useState<RecentCalculation[]>([]);

  useEffect(() => setRecent(getRecent(storageKey)), [storageKey]);

  function reset() {
    setRuns("");
    setOvers(defaultOvers);
    setErrors([]);
    setResult(null);
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = combineValidationResults(
      validateNumericInput(runs, { label: "Runs scored", required: true, allowZero: true }),
      validateOversInput(overs, "Overs faced"),
    );

    if (!validation.isValid) {
      setErrors(validation.errors);
      setResult(null);
      return;
    }

    const runValue = Number(runs);
    const balls = cricketOversToBalls(overs);
    const decimalOvers = cricketOversToDecimalOvers(overs);
    const runRate = runValue / decimalOvers;
    const summary = `${resultLabel}: ${formatNumber(runRate)} from ${runValue} runs in ${overs} overs`;
    const nextResult = {
      title: `${resultLabel} ${formatNumber(runRate)}`,
      lines: [
        `${resultLabel}: ${formatNumber(runRate)}`,
        `Runs: ${runValue}`,
        `Overs: ${overs}`,
        `Balls equivalent: ${balls}`,
      ],
      explanation: `${runValue} runs from ${balls} balls equals ${formatNumber(runRate)} runs per over. ${contextNote}`,
    };

    setErrors([]);
    setResult(nextResult);
    setRecent(saveRecent(storageKey, summary));
  }

  return (
    <CalculatorShell title={title} result={result} errors={errors} recent={recent}>
      <form onSubmit={calculate} className="mt-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="runs-scored">Runs scored</FieldLabel>
            <input id="runs-scored" value={runs} onChange={(event) => setRuns(event.target.value)} className={inputClass} inputMode="decimal" />
          </div>
          <div>
            <FieldLabel htmlFor="overs-faced" tooltip={<GlossaryTooltip term="Overs" />}>Overs faced</FieldLabel>
            <input id="overs-faced" value={overs} onChange={(event) => setOvers(event.target.value)} className={inputClass} inputMode="decimal" placeholder={defaultOvers || "4.3"} />
            <OversHint value={overs} label="Overs faced" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className={buttonClass}>Calculate {resultLabel}</button>
          <button type="button" onClick={reset} className={secondaryButtonClass}>Reset</button>
        </div>
      </form>
    </CalculatorShell>
  );
}

export function RequiredRunRateCalculator() {
  const storageKey = "rkbsports:required-run-rate-recent";
  const [format, setFormat] = useState<"T20" | "ODI" | "Test" | "Custom">("T20");
  const [target, setTarget] = useState("");
  const [current, setCurrent] = useState("");
  const [completedOvers, setCompletedOvers] = useState("");
  const [totalOvers, setTotalOvers] = useState("20");
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<ResultBlock | null>(null);
  const [recent, setRecent] = useState<RecentCalculation[]>([]);

  useEffect(() => setRecent(getRecent(storageKey)), []);

  function chooseFormat(nextFormat: "T20" | "ODI" | "Test" | "Custom") {
    setFormat(nextFormat);
    if (nextFormat === "T20") setTotalOvers("20");
    if (nextFormat === "ODI") setTotalOvers("50");
    if (nextFormat === "Test") setTotalOvers("");
  }

  function reset() {
    setTarget("");
    setCurrent("");
    setCompletedOvers("");
    setTotalOvers(format === "T20" ? "20" : format === "ODI" ? "50" : "");
    setErrors([]);
    setResult(null);
  }

  function guidance(rrr: number) {
    if (rrr < 6) return "Comfortable";
    if (rrr <= 9) return "Manageable";
    if (rrr <= 12) return "Challenging";
    return "Very difficult";
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = combineValidationResults(
      validateNumericInput(target, { label: "Target score", required: true }),
      validateNumericInput(current, { label: "Current score", required: true, allowZero: true }),
      validateOversInput(completedOvers, "Overs completed"),
      validateOversInput(totalOvers, "Total overs"),
    );

    if (!validation.isValid) {
      setErrors(validation.errors);
      setResult(null);
      return;
    }

    const targetValue = Number(target);
    const currentValue = Number(current);

    if (currentValue >= targetValue) {
      const wonResult = {
        title: "Match already won",
        lines: [`Runs needed: 0`, `Current score: ${currentValue}`, `Target score: ${targetValue}`],
        explanation: "The current score is already equal to or above the target.",
        shareCard: {
          calculatorName: "Required Run Rate Calculator",
          mainResult: "Match already won",
          verdict: "The current score is already equal to or above the target.",
        },
      };
      setErrors([]);
      setResult(wonResult);
      setRecent(saveRecent(storageKey, `Already won: ${currentValue}/${targetValue}`));
      return;
    }

    const completedBalls = cricketOversToBalls(completedOvers);
    const totalBalls = cricketOversToBalls(totalOvers);
    const ballsRemaining = totalBalls - completedBalls;

    if (ballsRemaining <= 0) {
      setErrors(["No balls are remaining. Overs completed must be less than total overs."]);
      setResult(null);
      return;
    }

    const runsNeeded = targetValue - currentValue;
    const remainingDecimalOvers = ballsRemaining / 6;
    const requiredRunRate = runsNeeded / remainingDecimalOvers;
    const remainingOvers = ballsToCricketOvers(ballsRemaining);
    const chaseGuidance = guidance(requiredRunRate);
    const summary = `RRR: ${formatNumber(requiredRunRate)}. Need ${runsNeeded} from ${ballsRemaining} balls.`;

    const nextResult = {
      title: `Required Run Rate ${formatNumber(requiredRunRate)}`,
      lines: [
        `Runs needed: ${runsNeeded}`,
        `Balls remaining: ${ballsRemaining}`,
        `Overs remaining: ${remainingOvers}`,
        `Required Run Rate: ${formatNumber(requiredRunRate)}`,
        `Guidance: ${chaseGuidance}`,
      ],
      explanation: `Need ${runsNeeded} runs from ${ballsRemaining} balls. Chase guidance: ${chaseGuidance}.`,
      shareCard: {
        calculatorName: "Required Run Rate Calculator",
        mainResult: `Need ${runsNeeded} from ${ballsRemaining} balls`,
        verdict: `Required run rate ${formatNumber(requiredRunRate)}. ${chaseGuidance}.`,
      },
    };

    setErrors([]);
    setResult(nextResult);
    setRecent(saveRecent(storageKey, summary));
  }

  const totalOversLocked = format !== "Custom";

  return (
    <CalculatorShell title="Required run rate calculator" result={result} errors={errors} recent={recent}>
      <form onSubmit={calculate} className="mt-6 space-y-5">
        <div className="flex flex-wrap gap-2" aria-label="Match format">
          {(["T20", "ODI", "Test", "Custom"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => chooseFormat(option)}
              className={option === format ? buttonClass : secondaryButtonClass}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="target-score">Target score</FieldLabel>
            <input id="target-score" value={target} onChange={(event) => setTarget(event.target.value)} className={inputClass} inputMode="decimal" />
          </div>
          <div>
            <FieldLabel htmlFor="current-score">Current score</FieldLabel>
            <input id="current-score" value={current} onChange={(event) => setCurrent(event.target.value)} className={inputClass} inputMode="decimal" />
          </div>
          <div>
            <FieldLabel htmlFor="overs-completed" tooltip={<GlossaryTooltip term="Overs" />}>Overs completed</FieldLabel>
            <input id="overs-completed" value={completedOvers} onChange={(event) => setCompletedOvers(event.target.value)} className={inputClass} inputMode="decimal" placeholder="12.4" />
            <OversHint value={completedOvers} label="Overs completed" />
          </div>
          <div>
            <FieldLabel htmlFor="total-overs" tooltip={<GlossaryTooltip term="Overs" />}>Total overs</FieldLabel>
            <input id="total-overs" value={totalOvers} onChange={(event) => setTotalOvers(event.target.value)} disabled={totalOversLocked} className={inputClass} inputMode="decimal" placeholder={format === "Test" ? "Use Custom for limited overs" : "20"} />
            <OversHint value={totalOvers} label="Total overs" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className={buttonClass}>Calculate Required Run Rate</button>
          <button type="button" onClick={reset} className={secondaryButtonClass}>Reset</button>
        </div>
      </form>
    </CalculatorShell>
  );
}

type NrrCalculatorProps = {
  storageKey?: string;
  title?: string;
  calculatorName?: string;
  defaultOvers?: string;
  contextNote?: string;
};

export function NrrCalculator({
  storageKey = "rkbsports:nrr-recent",
  title = "NRR calculator",
  calculatorName = "NRR Calculator",
  defaultOvers = "",
  contextNote = "This is a simple manual estimate.",
}: NrrCalculatorProps = {}) {
  const [teamName, setTeamName] = useState("");
  const [savedTeams, setSavedTeams] = useState<SavedTeam[]>([]);
  const [runsScored, setRunsScored] = useState("");
  const [oversFaced, setOversFaced] = useState(defaultOvers);
  const [runsConceded, setRunsConceded] = useState("");
  const [oversBowled, setOversBowled] = useState(defaultOvers);
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<ResultBlock | null>(null);
  const [recent, setRecent] = useState<RecentCalculation[]>([]);

  useEffect(() => {
    setRecent(getRecent(storageKey));
    setSavedTeams(readSavedTeams());
  }, [storageKey]);

  function reset() {
    setTeamName("");
    setRunsScored("");
    setOversFaced(defaultOvers);
    setRunsConceded("");
    setOversBowled(defaultOvers);
    setErrors([]);
    setResult(null);
  }

  function interpretation(nrr: number) {
    if (nrr > 0.05) return "Positive NRR is good.";
    if (nrr < -0.05) return "Negative NRR needs improvement.";
    return "Around zero means the rates are balanced.";
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = combineValidationResults(
      validateNumericInput(runsScored, { label: "Runs scored", required: true, allowZero: true }),
      validateOversInput(oversFaced, "Overs faced"),
      validateNumericInput(runsConceded, { label: "Runs conceded", required: true, allowZero: true }),
      validateOversInput(oversBowled, "Overs bowled"),
    );

    if (!validation.isValid) {
      setErrors(validation.errors);
      setResult(null);
      return;
    }

    const teamRunRate = Number(runsScored) / cricketOversToDecimalOvers(oversFaced);
    const opponentRunRate = Number(runsConceded) / cricketOversToDecimalOvers(oversBowled);
    const nrr = teamRunRate - opponentRunRate;
    const nrrText = `${nrr >= 0 ? "+" : ""}${formatNumber(nrr)}`;
    const note = `${interpretation(nrr)} ${contextNote} Note: all-out innings may have tournament-specific rules.`;
    const cleanTeamName = teamName.trim();
    const teamPrefix = cleanTeamName ? `${cleanTeamName} ` : "";
    const summary = `${teamPrefix}NRR: ${nrrText}. Team RR ${formatNumber(teamRunRate)}, Opponent RR ${formatNumber(opponentRunRate)}.`;
    const nextResult = {
      title: `Net Run Rate ${nrrText}`,
      lines: [
        ...(cleanTeamName ? [`Team: ${cleanTeamName}`] : []),
        `Team Run Rate: ${formatNumber(teamRunRate)}`,
        `Opponent Run Rate: ${formatNumber(opponentRunRate)}`,
        `Net Run Rate: ${nrrText}`,
        `Interpretation: ${interpretation(nrr)}`,
      ],
      explanation: note,
      shareCard: {
        calculatorName,
        mainResult: `Net Run Rate ${nrrText}`,
        verdict: interpretation(nrr),
        teamName: cleanTeamName || undefined,
      },
    };

    setErrors([]);
    setResult(nextResult);
    setRecent(saveRecent(storageKey, summary));
  }

  return (
    <CalculatorShell title={title} result={result} errors={errors} recent={recent}>
      <form onSubmit={calculate} className="mt-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="nrr-team-name">Team name optional</FieldLabel>
            <input id="nrr-team-name" value={teamName} onChange={(event) => setTeamName(event.target.value)} className={inputClass} placeholder="Your team name" />
          </div>
          {savedTeams.length > 0 ? (
            <div>
              <FieldLabel htmlFor="nrr-saved-team">Select saved team optional</FieldLabel>
              <select id="nrr-saved-team" value={teamName} onChange={(event) => setTeamName(event.target.value)} className={inputClass}>
                <option value="">Choose a saved team</option>
                {savedTeams.map((team) => (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="runs-scored-nrr">Runs scored</FieldLabel>
            <input id="runs-scored-nrr" value={runsScored} onChange={(event) => setRunsScored(event.target.value)} className={inputClass} inputMode="decimal" />
          </div>
          <div>
            <FieldLabel htmlFor="overs-faced-nrr" tooltip={<GlossaryTooltip term="Overs" />}>Overs faced</FieldLabel>
            <input id="overs-faced-nrr" value={oversFaced} onChange={(event) => setOversFaced(event.target.value)} className={inputClass} inputMode="decimal" placeholder={defaultOvers || "20"} />
            <OversHint value={oversFaced} label="Overs faced" />
          </div>
          <div>
            <FieldLabel htmlFor="runs-conceded">Runs conceded</FieldLabel>
            <input id="runs-conceded" value={runsConceded} onChange={(event) => setRunsConceded(event.target.value)} className={inputClass} inputMode="decimal" />
          </div>
          <div>
            <FieldLabel htmlFor="overs-bowled" tooltip={<GlossaryTooltip term="Overs" />}>Overs bowled</FieldLabel>
            <input id="overs-bowled" value={oversBowled} onChange={(event) => setOversBowled(event.target.value)} className={inputClass} inputMode="decimal" placeholder={defaultOvers || "20"} />
            <OversHint value={oversBowled} label="Overs bowled" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className={buttonClass}>Calculate NRR</button>
          <button type="button" onClick={reset} className={secondaryButtonClass}>Reset</button>
        </div>
      </form>
    </CalculatorShell>
  );
}

export function StrikeRateCalculator() {
  const storageKey = "rkbsports:strike-rate-recent";
  const [runs, setRuns] = useState("");
  const [balls, setBalls] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<ResultBlock | null>(null);
  const [recent, setRecent] = useState<RecentCalculation[]>([]);

  useEffect(() => setRecent(getRecent(storageKey)), []);

  function reset() {
    setRuns("");
    setBalls("");
    setErrors([]);
    setResult(null);
  }

  function interpretation(strikeRate: number) {
    if (strikeRate >= 150) return "Fast scoring tempo.";
    if (strikeRate >= 100) return "Steady scoring tempo.";
    return "Conservative scoring tempo.";
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = combineValidationResults(
      validateNumericInput(runs, { label: "Runs scored", required: true, allowZero: true }),
      validateNumericInput(balls, { label: "Balls faced", required: true }),
    );

    if (!validation.isValid) {
      setErrors(validation.errors);
      setResult(null);
      return;
    }

    const runValue = Number(runs);
    const ballValue = Number(balls);
    const strikeRate = (runValue / ballValue) * 100;
    const summary = `Strike Rate: ${formatNumber(strikeRate)} from ${runValue} runs off ${ballValue} balls.`;
    const nextResult = {
      title: `Strike Rate ${formatNumber(strikeRate)}`,
      lines: [
        `Strike Rate: ${formatNumber(strikeRate)}`,
        `Runs: ${runValue}`,
        `Balls: ${ballValue}`,
        `Interpretation: ${interpretation(strikeRate)}`,
      ],
      explanation: `${runValue} runs from ${ballValue} balls gives a strike rate of ${formatNumber(strikeRate)}. ${interpretation(strikeRate)}`,
    };

    setErrors([]);
    setResult(nextResult);
    setRecent(saveRecent(storageKey, summary));
  }

  return (
    <CalculatorShell title="Strike rate calculator" result={result} errors={errors} recent={recent}>
      <form onSubmit={calculate} className="mt-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="strike-runs" tooltip={<GlossaryTooltip term="Strike Rate" />}>Runs scored</FieldLabel>
            <input id="strike-runs" value={runs} onChange={(event) => setRuns(event.target.value)} className={inputClass} inputMode="decimal" />
          </div>
          <div>
            <FieldLabel htmlFor="strike-balls" tooltip={<GlossaryTooltip term="Balls" />}>Balls faced</FieldLabel>
            <input id="strike-balls" value={balls} onChange={(event) => setBalls(event.target.value)} className={inputClass} inputMode="decimal" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className={buttonClass}>Calculate Strike Rate</button>
          <button type="button" onClick={reset} className={secondaryButtonClass}>Reset</button>
        </div>
      </form>
    </CalculatorShell>
  );
}

export function EconomyRateCalculator() {
  const storageKey = "rkbsports:economy-rate-recent";
  const [runsConceded, setRunsConceded] = useState("");
  const [oversBowled, setOversBowled] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<ResultBlock | null>(null);
  const [recent, setRecent] = useState<RecentCalculation[]>([]);

  useEffect(() => setRecent(getRecent(storageKey)), []);

  function reset() {
    setRunsConceded("");
    setOversBowled("");
    setErrors([]);
    setResult(null);
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = combineValidationResults(
      validateNumericInput(runsConceded, { label: "Runs conceded", required: true, allowZero: true }),
      validateOversInput(oversBowled, "Overs bowled"),
    );

    if (!validation.isValid) {
      setErrors(validation.errors);
      setResult(null);
      return;
    }

    const runValue = Number(runsConceded);
    const balls = cricketOversToBalls(oversBowled);
    const economyRate = runValue / cricketOversToDecimalOvers(oversBowled);
    const summary = `Economy Rate: ${formatNumber(economyRate)} from ${runValue} runs in ${oversBowled} overs.`;
    const nextResult = {
      title: `Economy Rate ${formatNumber(economyRate)}`,
      lines: [
        `Economy Rate: ${formatNumber(economyRate)}`,
        `Runs conceded: ${runValue}`,
        `Overs bowled: ${oversBowled}`,
        `Balls equivalent: ${balls}`,
      ],
      explanation: `${runValue} runs conceded from ${balls} balls equals ${formatNumber(economyRate)} runs per over.`,
    };

    setErrors([]);
    setResult(nextResult);
    setRecent(saveRecent(storageKey, summary));
  }

  return (
    <CalculatorShell title="Economy rate calculator" result={result} errors={errors} recent={recent}>
      <form onSubmit={calculate} className="mt-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="economy-runs" tooltip={<GlossaryTooltip term="Economy Rate" />}>Runs conceded</FieldLabel>
            <input id="economy-runs" value={runsConceded} onChange={(event) => setRunsConceded(event.target.value)} className={inputClass} inputMode="decimal" />
          </div>
          <div>
            <FieldLabel htmlFor="economy-overs" tooltip={<GlossaryTooltip term="Overs" />}>Overs bowled</FieldLabel>
            <input id="economy-overs" value={oversBowled} onChange={(event) => setOversBowled(event.target.value)} className={inputClass} inputMode="decimal" placeholder="4.3" />
            <OversHint value={oversBowled} label="Overs bowled" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className={buttonClass}>Calculate Economy Rate</button>
          <button type="button" onClick={reset} className={secondaryButtonClass}>Reset</button>
        </div>
      </form>
    </CalculatorShell>
  );
}

export function BattingAverageCalculator() {
  const storageKey = "rkbsports:batting-average-recent";
  const [runs, setRuns] = useState("");
  const [dismissals, setDismissals] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<ResultBlock | null>(null);
  const [recent, setRecent] = useState<RecentCalculation[]>([]);

  useEffect(() => setRecent(getRecent(storageKey)), []);

  function reset() {
    setRuns("");
    setDismissals("");
    setErrors([]);
    setResult(null);
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = combineValidationResults(
      validateNumericInput(runs, { label: "Total runs", required: true, allowZero: true }),
      validateNumericInput(dismissals, { label: "Number of dismissals", required: true, allowZero: true }),
    );

    if (!validation.isValid) {
      setErrors(validation.errors);
      setResult(null);
      return;
    }

    const runValue = Number(runs);
    const dismissalValue = Number(dismissals);

    if (dismissalValue === 0) {
      const notOutResult = {
        title: "Average not available",
        lines: [`Total runs: ${runValue}`, `Dismissals: 0`],
        explanation: "Not out average cannot be calculated by normal division.",
      };
      setErrors([]);
      setResult(notOutResult);
      setRecent(saveRecent(storageKey, `Batting average unavailable: ${runValue} runs, 0 dismissals.`));
      return;
    }

    const average = runValue / dismissalValue;
    const summary = `Batting Average: ${formatNumber(average)} from ${runValue} runs and ${dismissalValue} dismissals.`;
    const nextResult = {
      title: `Batting Average ${formatNumber(average)}`,
      lines: [
        `Batting Average: ${formatNumber(average)}`,
        `Total runs: ${runValue}`,
        `Dismissals: ${dismissalValue}`,
      ],
      explanation: `${runValue} runs divided by ${dismissalValue} dismissals gives a batting average of ${formatNumber(average)}.`,
    };

    setErrors([]);
    setResult(nextResult);
    setRecent(saveRecent(storageKey, summary));
  }

  return (
    <CalculatorShell title="Batting average calculator" result={result} errors={errors} recent={recent}>
      <form onSubmit={calculate} className="mt-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="batting-runs" tooltip={<GlossaryTooltip term="Batting Average" />}>Total runs</FieldLabel>
            <input id="batting-runs" value={runs} onChange={(event) => setRuns(event.target.value)} className={inputClass} inputMode="decimal" />
          </div>
          <div>
            <FieldLabel htmlFor="batting-dismissals">Number of dismissals</FieldLabel>
            <input id="batting-dismissals" value={dismissals} onChange={(event) => setDismissals(event.target.value)} className={inputClass} inputMode="decimal" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className={buttonClass}>Calculate Batting Average</button>
          <button type="button" onClick={reset} className={secondaryButtonClass}>Reset</button>
        </div>
      </form>
    </CalculatorShell>
  );
}

export function BowlingAverageCalculator() {
  const storageKey = "rkbsports:bowling-average-recent";
  const [runsConceded, setRunsConceded] = useState("");
  const [wickets, setWickets] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<ResultBlock | null>(null);
  const [recent, setRecent] = useState<RecentCalculation[]>([]);

  useEffect(() => setRecent(getRecent(storageKey)), []);

  function reset() {
    setRunsConceded("");
    setWickets("");
    setErrors([]);
    setResult(null);
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = combineValidationResults(
      validateNumericInput(runsConceded, { label: "Runs conceded", required: true, allowZero: true }),
      validateNumericInput(wickets, { label: "Wickets taken", required: true, allowZero: true }),
    );

    if (!validation.isValid) {
      setErrors(validation.errors);
      setResult(null);
      return;
    }

    const runValue = Number(runsConceded);
    const wicketValue = Number(wickets);

    if (wicketValue === 0) {
      setErrors(["Bowling average cannot be calculated when wickets taken is 0."]);
      setResult(null);
      return;
    }

    const average = runValue / wicketValue;
    const summary = `Bowling Average: ${formatNumber(average)} from ${runValue} runs and ${wicketValue} wickets.`;
    const nextResult = {
      title: `Bowling Average ${formatNumber(average)}`,
      lines: [
        `Bowling Average: ${formatNumber(average)}`,
        `Runs conceded: ${runValue}`,
        `Wickets taken: ${wicketValue}`,
      ],
      explanation: `${runValue} runs conceded divided by ${wicketValue} wickets gives a bowling average of ${formatNumber(average)}.`,
    };

    setErrors([]);
    setResult(nextResult);
    setRecent(saveRecent(storageKey, summary));
  }

  return (
    <CalculatorShell title="Bowling average calculator" result={result} errors={errors} recent={recent}>
      <form onSubmit={calculate} className="mt-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="bowling-runs" tooltip={<GlossaryTooltip term="Bowling Average" />}>Runs conceded</FieldLabel>
            <input id="bowling-runs" value={runsConceded} onChange={(event) => setRunsConceded(event.target.value)} className={inputClass} inputMode="decimal" />
          </div>
          <div>
            <FieldLabel htmlFor="bowling-wickets" tooltip={<GlossaryTooltip term="Wickets" />}>Wickets taken</FieldLabel>
            <input id="bowling-wickets" value={wickets} onChange={(event) => setWickets(event.target.value)} className={inputClass} inputMode="decimal" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className={buttonClass}>Calculate Bowling Average</button>
          <button type="button" onClick={reset} className={secondaryButtonClass}>Reset</button>
        </div>
      </form>
    </CalculatorShell>
  );
}

function ProgressBar({ label, value }: { label: string; value: number }) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div>
      <div className="flex justify-between gap-4 text-xs font-bold text-slate-700 dark:text-slate-200">
        <span>{label}</span>
        <span>{formatNumber(safeValue)}%</span>
      </div>
      <div className="mt-2 h-3 rounded bg-slate-200 dark:bg-slate-800">
        <div
          className="h-3 rounded bg-emerald-600 dark:bg-emerald-400"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}

export function SuperOverTargetCalculator() {
  const storageKey = "rkbsports:super-over-target-recent";
  const [firstRuns, setFirstRuns] = useState("");
  const [wicketsLost, setWicketsLost] = useState("");
  const [currentScore, setCurrentScore] = useState("");
  const [ballsCompleted, setBallsCompleted] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<ResultBlock | null>(null);
  const [recent, setRecent] = useState<RecentCalculation[]>([]);

  useEffect(() => setRecent(getRecent(storageKey)), []);

  function reset() {
    setFirstRuns("");
    setWicketsLost("");
    setCurrentScore("");
    setBallsCompleted("");
    setErrors([]);
    setResult(null);
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = combineValidationResults(
      validateNumericInput(firstRuns, { label: "First team super over runs", required: true, allowZero: true }),
      validateNumericInput(wicketsLost, { label: "First team wickets lost", required: true, allowZero: true }),
      validateNumericInput(currentScore, { label: "Current chasing score", required: true, allowZero: true }),
      validateNumericInput(ballsCompleted, { label: "Balls completed", required: true, allowZero: true }),
    );
    const nextErrors = [...validation.errors];
    const wicketValue = Number(wicketsLost);
    const ballsValue = Number(ballsCompleted);

    if (wicketValue > 2) nextErrors.push("Wickets cannot exceed 2 in a super over.");
    if (ballsValue > 6) nextErrors.push("Balls completed cannot exceed 6 in a super over.");

    if (nextErrors.length > 0) {
      setErrors(nextErrors);
      setResult(null);
      return;
    }

    const firstRunValue = Number(firstRuns);
    const currentValue = Number(currentScore);
    const target = firstRunValue + 1;
    const runsNeeded = Math.max(0, target - currentValue);
    const ballsRemaining = Math.max(0, 6 - ballsValue);
    let verdict = "Still possible";

    if (currentValue >= target) verdict = "Already won";
    else if (ballsRemaining === 0 || wicketValue >= 2) verdict = "Innings over";

    const requiredPerBall =
      runsNeeded > 0 && ballsRemaining > 0 ? runsNeeded / ballsRemaining : 0;
    if (verdict === "Still possible" && requiredPerBall > 2) verdict = "Very difficult";
    const requiredRunRateEquivalent = requiredPerBall * 6;
    const summary = `Super Over: need ${runsNeeded} from ${ballsRemaining} balls. Verdict: ${verdict}.`;
    const nextResult = {
      title: `Target ${target} - ${verdict}`,
      lines: [
        `Target to win: ${target}`,
        `Runs needed: ${runsNeeded}`,
        `Balls remaining: ${ballsRemaining}`,
        `Required runs per ball: ${formatNumber(requiredPerBall)}`,
        `Required run rate equivalent: ${formatNumber(requiredRunRateEquivalent)}`,
        `Verdict: ${verdict}`,
      ],
      explanation:
        verdict === "Already won"
          ? "The chasing score has already reached the target."
          : verdict === "Innings over"
            ? "The super over chase has no legal balls or wickets left."
            : `The chasing team needs ${runsNeeded} from ${ballsRemaining} balls.`,
      shareCard: {
        calculatorName: "Super Over Target Calculator",
        mainResult: `Target ${target}`,
        verdict:
          verdict === "Already won"
            ? "Already won"
            : `${verdict}: need ${runsNeeded} from ${ballsRemaining} balls.`,
      },
    };

    setErrors([]);
    setResult(nextResult);
    setRecent(saveRecent(storageKey, summary));
  }

  return (
    <CalculatorShell title="Super over target calculator" result={result} errors={errors} recent={recent}>
      <form onSubmit={calculate} className="mt-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="super-first-runs">First team super over runs</FieldLabel>
            <input id="super-first-runs" value={firstRuns} onChange={(event) => setFirstRuns(event.target.value)} className={inputClass} inputMode="decimal" />
          </div>
          <div>
            <FieldLabel htmlFor="super-wickets" tooltip={<GlossaryTooltip term="Wickets" />}>First team wickets lost</FieldLabel>
            <input id="super-wickets" value={wicketsLost} onChange={(event) => setWicketsLost(event.target.value)} className={inputClass} inputMode="decimal" />
          </div>
          <div>
            <FieldLabel htmlFor="super-current">Current chasing score</FieldLabel>
            <input id="super-current" value={currentScore} onChange={(event) => setCurrentScore(event.target.value)} className={inputClass} inputMode="decimal" />
          </div>
          <div>
            <FieldLabel htmlFor="super-balls" tooltip={<GlossaryTooltip term="Balls" />}>Balls completed in chase</FieldLabel>
            <input id="super-balls" value={ballsCompleted} onChange={(event) => setBallsCompleted(event.target.value)} className={inputClass} inputMode="decimal" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className={buttonClass}>Calculate Super Over Target</button>
          <button type="button" onClick={reset} className={secondaryButtonClass}>Reset</button>
        </div>
      </form>
    </CalculatorShell>
  );
}

export function BowlersSpellAnalyzer() {
  const storageKey = "rkbsports:bowlers-spell-recent";
  const [overs, setOvers] = useState("");
  const [runs, setRuns] = useState("");
  const [wickets, setWickets] = useState("");
  const [dotBalls, setDotBalls] = useState("");
  const [boundaries, setBoundaries] = useState("");
  const [wides, setWides] = useState("");
  const [noBalls, setNoBalls] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<ResultBlock | null>(null);
  const [progress, setProgress] = useState<Array<{ label: string; value: number }>>([]);
  const [recent, setRecent] = useState<RecentCalculation[]>([]);

  useEffect(() => setRecent(getRecent(storageKey)), []);

  function reset() {
    setOvers("");
    setRuns("");
    setWickets("");
    setDotBalls("");
    setBoundaries("");
    setWides("");
    setNoBalls("");
    setErrors([]);
    setResult(null);
    setProgress([]);
  }

  function verdict(score: number) {
    if (score >= 80) return "Excellent";
    if (score >= 65) return "Good";
    if (score >= 45) return "Average";
    return "Poor";
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = combineValidationResults(
      validateOversInput(overs, "Overs bowled"),
      validateNumericInput(runs, { label: "Runs conceded", required: true, allowZero: true }),
      validateNumericInput(wickets, { label: "Wickets taken", required: true, allowZero: true }),
      validateNumericInput(dotBalls, { label: "Dot balls", required: true, allowZero: true }),
      validateNumericInput(boundaries, { label: "Boundaries conceded", required: true, allowZero: true }),
      validateNumericInput(wides, { label: "Wides", required: true, allowZero: true }),
      validateNumericInput(noBalls, { label: "No balls", required: true, allowZero: true }),
    );
    const nextErrors = [...validation.errors];
    const legalBalls = validation.isValid ? cricketOversToBalls(overs) : 0;
    const dotValue = Number(dotBalls);
    const boundaryValue = Number(boundaries);

    if (dotValue > legalBalls) nextErrors.push("Dot balls cannot exceed legal balls bowled.");
    if (boundaryValue > legalBalls) nextErrors.push("Boundary count cannot exceed legal balls bowled.");

    if (nextErrors.length > 0) {
      setErrors(nextErrors);
      setResult(null);
      setProgress([]);
      return;
    }

    const runValue = Number(runs);
    const wicketValue = Number(wickets);
    const widesValue = Number(wides);
    const noBallsValue = Number(noBalls);
    const economy = runValue / cricketOversToDecimalOvers(overs);
    const dotPercentage = (dotValue / legalBalls) * 100;
    const boundaryFrequency = boundaryValue === 0 ? 0 : legalBalls / boundaryValue;
    const extras = widesValue + noBallsValue;
    const economyScore = Math.max(0, 35 - economy * 3);
    const dotScore = Math.min(30, dotPercentage * 0.45);
    const wicketScore = Math.min(20, wicketValue * 7);
    const controlScore = Math.max(0, 15 - boundaryValue * 2 - extras);
    const performanceScore = economyScore + dotScore + wicketScore + controlScore;
    const spellVerdict = verdict(performanceScore);
    const summary = `Spell: ${spellVerdict}, economy ${formatNumber(economy)}, dot ${formatNumber(dotPercentage)}%.`;

    const nextResult = {
      title: `Spell Verdict ${spellVerdict}`,
      lines: [
        `Economy rate: ${formatNumber(economy)}`,
        `Dot ball percentage: ${formatNumber(dotPercentage)}%`,
        `Boundary frequency: ${boundaryValue === 0 ? "No boundaries" : `1 every ${formatNumber(boundaryFrequency)} balls`}`,
        `Extras count: ${extras}`,
        `Performance score: ${formatNumber(performanceScore)}`,
        `Performance verdict: ${spellVerdict}`,
      ],
      explanation: `This spell combined ${legalBalls} legal balls, ${dotValue} dot balls, ${wicketValue} wickets, and ${extras} wides/no balls.`,
    };

    setErrors([]);
    setResult(nextResult);
    setProgress([
      { label: "Dot pressure", value: dotPercentage },
      { label: "Economy control", value: Math.max(0, Math.min(100, 100 - economy * 8)) },
      { label: "Performance score", value: performanceScore },
    ]);
    setRecent(saveRecent(storageKey, summary));
  }

  return (
    <CalculatorShell title="Bowler's spell analyzer" result={result} errors={errors} recent={recent}>
      <form onSubmit={calculate} className="mt-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="spell-overs" tooltip={<GlossaryTooltip term="Overs" />}>Overs bowled</FieldLabel>
            <input id="spell-overs" value={overs} onChange={(event) => setOvers(event.target.value)} className={inputClass} inputMode="decimal" placeholder="4" />
            <OversHint value={overs} label="Overs bowled" />
          </div>
          <div>
            <FieldLabel htmlFor="spell-runs" tooltip={<GlossaryTooltip term="Economy Rate" />}>Runs conceded</FieldLabel>
            <input id="spell-runs" value={runs} onChange={(event) => setRuns(event.target.value)} className={inputClass} inputMode="decimal" />
          </div>
          <div>
            <FieldLabel htmlFor="spell-wickets" tooltip={<GlossaryTooltip term="Wickets" />}>Wickets taken</FieldLabel>
            <input id="spell-wickets" value={wickets} onChange={(event) => setWickets(event.target.value)} className={inputClass} inputMode="decimal" />
          </div>
          <div>
            <FieldLabel htmlFor="spell-dots" tooltip={<GlossaryTooltip term="Balls" />}>Dot balls</FieldLabel>
            <input id="spell-dots" value={dotBalls} onChange={(event) => setDotBalls(event.target.value)} className={inputClass} inputMode="decimal" />
          </div>
          <div>
            <FieldLabel htmlFor="spell-boundaries">Boundaries conceded</FieldLabel>
            <input id="spell-boundaries" value={boundaries} onChange={(event) => setBoundaries(event.target.value)} className={inputClass} inputMode="decimal" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="spell-wides">Wides</FieldLabel>
              <input id="spell-wides" value={wides} onChange={(event) => setWides(event.target.value)} className={inputClass} inputMode="decimal" />
            </div>
            <div>
              <FieldLabel htmlFor="spell-noballs">No balls</FieldLabel>
              <input id="spell-noballs" value={noBalls} onChange={(event) => setNoBalls(event.target.value)} className={inputClass} inputMode="decimal" />
            </div>
          </div>
        </div>
        {progress.length > 0 ? (
          <div className="space-y-4 rounded border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
            {progress.map((item) => (
              <ProgressBar key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
        ) : null}
        <div className="flex flex-wrap gap-3">
          <button type="submit" className={buttonClass}>Analyze Spell</button>
          <button type="button" onClick={reset} className={secondaryButtonClass}>Reset</button>
        </div>
      </form>
    </CalculatorShell>
  );
}

export function TargetRunRateChasePlanner() {
  const storageKey = "rkbsports:target-chase-planner-recent";
  const [format, setFormat] = useState<"T20" | "ODI" | "Custom">("T20");
  const [target, setTarget] = useState("");
  const [totalOvers, setTotalOvers] = useState("20");
  const [currentScore, setCurrentScore] = useState("");
  const [oversCompleted, setOversCompleted] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<ResultBlock | null>(null);
  const [recent, setRecent] = useState<RecentCalculation[]>([]);

  useEffect(() => setRecent(getRecent(storageKey)), []);

  function chooseFormat(nextFormat: "T20" | "ODI" | "Custom") {
    setFormat(nextFormat);
    if (nextFormat === "T20") setTotalOvers("20");
    if (nextFormat === "ODI") setTotalOvers("50");
  }

  function reset() {
    setTarget("");
    setCurrentScore("");
    setOversCompleted("");
    setTotalOvers(format === "ODI" ? "50" : format === "T20" ? "20" : "");
    setErrors([]);
    setResult(null);
  }

  function makePlan(name: string, runsNeeded: number, ballsRemaining: number, weights: [number, number, number]) {
    const labels = ["Powerplay / early overs", "Middle overs", "Death overs"];
    return `${name}: ${labels.map((label, index) => `${label} ${Math.round(runsNeeded * weights[index])} runs`).join(", ")} across ${ballsRemaining} balls.`;
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const currentValueText = currentScore.trim() || "0";
    const completedOversText = oversCompleted.trim() || "0";
    const validation = combineValidationResults(
      validateNumericInput(target, { label: "Target score", required: true }),
      validateOversInput(totalOvers, "Total overs"),
      validateNumericInput(currentValueText, { label: "Current score", required: true, allowZero: true }),
      validateCricketOvers(completedOversText).isValid
        ? { isValid: true, errors: [] }
        : { isValid: false, errors: [validateCricketOvers(completedOversText).error ?? "Overs completed are invalid."] },
    );

    if (!validation.isValid) {
      setErrors(validation.errors);
      setResult(null);
      return;
    }

    const targetValue = Number(target);
    const currentValue = Number(currentValueText);
    const totalBalls = cricketOversToBalls(totalOvers);
    const completedBalls = cricketOversToBalls(completedOversText);
    const ballsRemaining = totalBalls - completedBalls;

    if (currentValue >= targetValue) {
      const achieved = {
        title: "Target already achieved",
        lines: [`Runs needed: 0`, `Current score: ${currentValue}`, `Target score: ${targetValue}`],
        explanation: "The current score has already reached or passed the target.",
      };
      setErrors([]);
      setResult(achieved);
      setRecent(saveRecent(storageKey, `Target achieved: ${currentValue}/${targetValue}.`));
      return;
    }

    if (ballsRemaining <= 0) {
      setErrors(["Chase over. No balls are remaining."]);
      setResult(null);
      return;
    }

    const runsNeeded = targetValue - currentValue;
    const requiredRate = runsNeeded / (ballsRemaining / 6);
    const oversRemaining = ballsToCricketOvers(ballsRemaining);
    const aggressive = makePlan("Aggressive Plan", runsNeeded, ballsRemaining, [0.45, 0.35, 0.2]);
    const balanced = makePlan("Balanced Plan", runsNeeded, ballsRemaining, [0.34, 0.33, 0.33]);
    const lateCharge = makePlan("Late Charge Plan", runsNeeded, ballsRemaining, [0.25, 0.35, 0.4]);
    const summary = `Chase: need ${runsNeeded} from ${ballsRemaining} balls at ${formatNumber(requiredRate)} RPO.`;
    const nextResult = {
      title: `Required Rate ${formatNumber(requiredRate)}`,
      lines: [
        `Required overall run rate: ${formatNumber(requiredRate)}`,
        `Runs needed: ${runsNeeded}`,
        `Balls remaining: ${ballsRemaining}`,
        `Overs remaining: ${oversRemaining}`,
        `Aggressive Plan: ${aggressive}`,
        `Balanced Plan: ${balanced}`,
        `Late Charge Plan: ${lateCharge}`,
      ],
      explanation: "These are manual planning splits, not predictions or live match recommendations.",
    };

    setErrors([]);
    setResult(nextResult);
    setRecent(saveRecent(storageKey, summary));
  }

  const totalOversLocked = format !== "Custom";

  return (
    <CalculatorShell title="Target run rate chase planner" result={result} errors={errors} recent={recent}>
      <form onSubmit={calculate} className="mt-6 space-y-5">
        <div className="flex flex-wrap gap-2" aria-label="Match format">
          {(["T20", "ODI", "Custom"] as const).map((option) => (
            <button key={option} type="button" onClick={() => chooseFormat(option)} className={option === format ? buttonClass : secondaryButtonClass}>
              {option}
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="planner-target">Target score</FieldLabel>
            <input id="planner-target" value={target} onChange={(event) => setTarget(event.target.value)} className={inputClass} inputMode="decimal" />
          </div>
          <div>
            <FieldLabel htmlFor="planner-total-overs" tooltip={<GlossaryTooltip term="Overs" />}>Total overs</FieldLabel>
            <input id="planner-total-overs" value={totalOvers} disabled={totalOversLocked} onChange={(event) => setTotalOvers(event.target.value)} className={inputClass} inputMode="decimal" />
            <OversHint value={totalOvers} label="Total overs" />
          </div>
          <div>
            <FieldLabel htmlFor="planner-current">Current score optional</FieldLabel>
            <input id="planner-current" value={currentScore} onChange={(event) => setCurrentScore(event.target.value)} className={inputClass} inputMode="decimal" placeholder="0" />
          </div>
          <div>
            <FieldLabel htmlFor="planner-completed" tooltip={<GlossaryTooltip term="Overs" />}>Overs completed optional</FieldLabel>
            <input id="planner-completed" value={oversCompleted} onChange={(event) => setOversCompleted(event.target.value)} className={inputClass} inputMode="decimal" placeholder="0" />
            <OversHint value={oversCompleted} label="Overs completed" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className={buttonClass}>Create Chase Plans</button>
          <button type="button" onClick={reset} className={secondaryButtonClass}>Reset</button>
        </div>
      </form>
    </CalculatorShell>
  );
}

export function FantasyCricketPointsCalculator() {
  const storageKey = "rkbsports:fantasy-points-recent";
  const [runs, setRuns] = useState("");
  const [balls, setBalls] = useState("");
  const [fours, setFours] = useState("");
  const [sixes, setSixes] = useState("");
  const [wickets, setWickets] = useState("");
  const [catches, setCatches] = useState("");
  const [runOuts, setRunOuts] = useState("");
  const [maidens, setMaidens] = useState("");
  const [economyRate, setEconomyRate] = useState("");
  const [strikeRate, setStrikeRate] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<ResultBlock | null>(null);
  const [recent, setRecent] = useState<RecentCalculation[]>([]);

  useEffect(() => setRecent(getRecent(storageKey)), []);

  function reset() {
    setRuns("");
    setBalls("");
    setFours("");
    setSixes("");
    setWickets("");
    setCatches("");
    setRunOuts("");
    setMaidens("");
    setEconomyRate("");
    setStrikeRate("");
    setErrors([]);
    setResult(null);
  }

  function valueOrZero(value: string) {
    return value.trim() ? Number(value) : 0;
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = combineValidationResults(
      validateNumericInput(runs || "0", { label: "Runs scored", required: true, allowZero: true }),
      validateNumericInput(balls || "0", { label: "Balls faced", required: true, allowZero: true }),
      validateNumericInput(fours || "0", { label: "Fours", required: true, allowZero: true }),
      validateNumericInput(sixes || "0", { label: "Sixes", required: true, allowZero: true }),
      validateNumericInput(wickets || "0", { label: "Wickets taken", required: true, allowZero: true }),
      validateNumericInput(catches || "0", { label: "Catches", required: true, allowZero: true }),
      validateNumericInput(runOuts || "0", { label: "Run outs / stumpings", required: true, allowZero: true }),
      validateNumericInput(maidens || "0", { label: "Maidens", required: true, allowZero: true }),
      validateNumericInput(economyRate || "0", { label: "Economy rate", required: true, allowZero: true }),
      validateNumericInput(strikeRate || "0", { label: "Strike rate", required: true, allowZero: true }),
    );

    if (!validation.isValid) {
      setErrors(validation.errors);
      setResult(null);
      return;
    }

    const runValue = valueOrZero(runs);
    const fourValue = valueOrZero(fours);
    const sixValue = valueOrZero(sixes);
    const wicketValue = valueOrZero(wickets);
    const catchValue = valueOrZero(catches);
    const runOutValue = valueOrZero(runOuts);
    const maidenValue = valueOrZero(maidens);
    const battingPoints = runValue;
    const bowlingPoints = wicketValue * 25 + maidenValue * 12;
    const fieldingPoints = catchValue * 8 + runOutValue * 12;
    const bonusPoints = fourValue * 1 + sixValue * 2;
    const totalPoints = battingPoints + bowlingPoints + fieldingPoints + bonusPoints;
    const summary = `Fantasy points: ${totalPoints}. Bat ${battingPoints}, Bowl ${bowlingPoints}, Field ${fieldingPoints}, Bonus ${bonusPoints}.`;
    const nextResult = {
      title: `Total Fantasy Points ${totalPoints}`,
      lines: [
        `Batting points: ${battingPoints}`,
        `Bowling points: ${bowlingPoints}`,
        `Fielding points: ${fieldingPoints}`,
        `Bonus points: ${bonusPoints}`,
        `Total fantasy points: ${totalPoints}`,
      ],
      explanation:
        "This is a generic fantasy points calculator. Actual fantasy platform rules may differ.",
    };

    setErrors([]);
    setResult(nextResult);
    setRecent(saveRecent(storageKey, summary));
  }

  return (
    <CalculatorShell title="Fantasy cricket points calculator" result={result} errors={errors} recent={recent}>
      <form onSubmit={calculate} className="mt-6 space-y-5">
        <div className="rounded border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
          Generic point system: Run 1, Four bonus 1, Six bonus 2, Wicket 25,
          Catch 8, Run out / stumping 12, Maiden over 12.
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><FieldLabel htmlFor="fantasy-runs">Runs scored</FieldLabel><input id="fantasy-runs" value={runs} onChange={(event) => setRuns(event.target.value)} className={inputClass} inputMode="decimal" /></div>
          <div><FieldLabel htmlFor="fantasy-balls" tooltip={<GlossaryTooltip term="Balls" />}>Balls faced</FieldLabel><input id="fantasy-balls" value={balls} onChange={(event) => setBalls(event.target.value)} className={inputClass} inputMode="decimal" /></div>
          <div><FieldLabel htmlFor="fantasy-fours">Fours</FieldLabel><input id="fantasy-fours" value={fours} onChange={(event) => setFours(event.target.value)} className={inputClass} inputMode="decimal" /></div>
          <div><FieldLabel htmlFor="fantasy-sixes">Sixes</FieldLabel><input id="fantasy-sixes" value={sixes} onChange={(event) => setSixes(event.target.value)} className={inputClass} inputMode="decimal" /></div>
          <div><FieldLabel htmlFor="fantasy-wickets" tooltip={<GlossaryTooltip term="Wickets" />}>Wickets taken</FieldLabel><input id="fantasy-wickets" value={wickets} onChange={(event) => setWickets(event.target.value)} className={inputClass} inputMode="decimal" /></div>
          <div><FieldLabel htmlFor="fantasy-catches">Catches</FieldLabel><input id="fantasy-catches" value={catches} onChange={(event) => setCatches(event.target.value)} className={inputClass} inputMode="decimal" /></div>
          <div><FieldLabel htmlFor="fantasy-run-outs">Run outs / stumpings</FieldLabel><input id="fantasy-run-outs" value={runOuts} onChange={(event) => setRunOuts(event.target.value)} className={inputClass} inputMode="decimal" /></div>
          <div><FieldLabel htmlFor="fantasy-maidens">Maidens</FieldLabel><input id="fantasy-maidens" value={maidens} onChange={(event) => setMaidens(event.target.value)} className={inputClass} inputMode="decimal" /></div>
          <div><FieldLabel htmlFor="fantasy-economy" tooltip={<GlossaryTooltip term="Economy Rate" />}>Economy rate optional</FieldLabel><input id="fantasy-economy" value={economyRate} onChange={(event) => setEconomyRate(event.target.value)} className={inputClass} inputMode="decimal" /></div>
          <div><FieldLabel htmlFor="fantasy-strike" tooltip={<GlossaryTooltip term="Strike Rate" />}>Strike rate optional</FieldLabel><input id="fantasy-strike" value={strikeRate} onChange={(event) => setStrikeRate(event.target.value)} className={inputClass} inputMode="decimal" /></div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className={buttonClass}>Calculate Fantasy Points</button>
          <button type="button" onClick={reset} className={secondaryButtonClass}>Reset</button>
        </div>
      </form>
    </CalculatorShell>
  );
}

export function FollowOnCalculator() {
  const storageKey = "rkbsports:follow-on-recent";
  const [firstRuns, setFirstRuns] = useState("");
  const [secondRuns, setSecondRuns] = useState("");
  const [format, setFormat] = useState<"5-day" | "4-day" | "3-day" | "2-day">("5-day");
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<ResultBlock | null>(null);
  const [recent, setRecent] = useState<RecentCalculation[]>([]);

  useEffect(() => setRecent(getRecent(storageKey)), []);

  const thresholds = {
    "5-day": 200,
    "4-day": 150,
    "3-day": 150,
    "2-day": 100,
  };

  function reset() {
    setFirstRuns("");
    setSecondRuns("");
    setFormat("5-day");
    setErrors([]);
    setResult(null);
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = combineValidationResults(
      validateNumericInput(firstRuns, { label: "Team batting first runs", required: true, allowZero: true }),
      validateNumericInput(secondRuns, { label: "Team batting second runs", required: true, allowZero: true }),
    );

    if (!validation.isValid) {
      setErrors(validation.errors);
      setResult(null);
      return;
    }

    const first = Number(firstRuns);
    const second = Number(secondRuns);
    const lead = first - second;
    const threshold = thresholds[format];
    const canEnforce = lead >= threshold;
    const verdict = canEnforce ? "Follow-on can be enforced" : "Follow-on cannot be enforced yet";
    const summary = `${verdict}. Lead ${lead}, threshold ${threshold}.`;
    const nextResult = {
      title: verdict,
      lines: [
        `Lead: ${lead}`,
        `Required threshold: ${threshold}`,
        `Match format: ${format}`,
        `Follow-on status: ${canEnforce ? "Can be enforced" : "Cannot be enforced"}`,
      ],
      explanation:
        "This calculator uses common follow-on lead thresholds. Competition playing conditions may vary, so official match rules should be checked.",
    };

    setErrors([]);
    setResult(nextResult);
    setRecent(saveRecent(storageKey, summary));
  }

  return (
    <CalculatorShell title="Follow-on calculator" result={result} errors={errors} recent={recent}>
      <form onSubmit={calculate} className="mt-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="follow-first">Team batting first runs</FieldLabel>
            <input id="follow-first" value={firstRuns} onChange={(event) => setFirstRuns(event.target.value)} className={inputClass} inputMode="decimal" />
          </div>
          <div>
            <FieldLabel htmlFor="follow-second">Team batting second runs</FieldLabel>
            <input id="follow-second" value={secondRuns} onChange={(event) => setSecondRuns(event.target.value)} className={inputClass} inputMode="decimal" />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="follow-format">Match format</FieldLabel>
            <select id="follow-format" value={format} onChange={(event) => setFormat(event.target.value as typeof format)} className={inputClass}>
              <option value="5-day">5-day match - 200 run threshold</option>
              <option value="4-day">4-day match - 150 run threshold</option>
              <option value="3-day">3-day match - 150 run threshold</option>
              <option value="2-day">2-day match - 100 run threshold</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className={buttonClass}>Check Follow-On</button>
          <button type="button" onClick={reset} className={secondaryButtonClass}>Reset</button>
        </div>
      </form>
    </CalculatorShell>
  );
}

export function BowlingStrikeRateCalculator() {
  const storageKey = "rkbsports:bowling-strike-rate-recent";
  const [ballsBowled, setBallsBowled] = useState("");
  const [wickets, setWickets] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<ResultBlock | null>(null);
  const [recent, setRecent] = useState<RecentCalculation[]>([]);

  useEffect(() => setRecent(getRecent(storageKey)), []);

  function reset() {
    setBallsBowled("");
    setWickets("");
    setErrors([]);
    setResult(null);
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = combineValidationResults(
      validateNumericInput(ballsBowled, { label: "Balls bowled", required: true }),
      validateNumericInput(wickets, { label: "Wickets taken", required: true, allowZero: true }),
    );

    if (!validation.isValid) {
      setErrors(validation.errors);
      setResult(null);
      return;
    }

    const balls = Number(ballsBowled);
    const wicketValue = Number(wickets);

    if (wicketValue === 0) {
      const noWicketsResult = {
        title: "Bowling strike rate unavailable",
        lines: [`Balls bowled: ${balls}`, `Wickets taken: 0`],
        explanation:
          "Bowling strike rate cannot be calculated by normal division when wickets are zero.",
      };
      setErrors([]);
      setResult(noWicketsResult);
      setRecent(saveRecent(storageKey, "Bowling strike rate unavailable with 0 wickets."));
      return;
    }

    const strikeRate = balls / wicketValue;
    const summary = `Bowling strike rate: ${formatNumber(strikeRate)} balls per wicket.`;
    const nextResult = {
      title: `Bowling Strike Rate ${formatNumber(strikeRate)}`,
      lines: [
        `Bowling strike rate: ${formatNumber(strikeRate)}`,
        `Balls bowled: ${balls}`,
        `Wickets taken: ${wicketValue}`,
      ],
      explanation: `The bowler takes a wicket every ${formatNumber(strikeRate)} balls on average.`,
    };

    setErrors([]);
    setResult(nextResult);
    setRecent(saveRecent(storageKey, summary));
  }

  return (
    <CalculatorShell title="Bowling strike rate calculator" result={result} errors={errors} recent={recent}>
      <form onSubmit={calculate} className="mt-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="bsr-balls" tooltip={<GlossaryTooltip term="Balls" />}>Balls bowled</FieldLabel>
            <input id="bsr-balls" value={ballsBowled} onChange={(event) => setBallsBowled(event.target.value)} className={inputClass} inputMode="numeric" />
          </div>
          <div>
            <FieldLabel htmlFor="bsr-wickets" tooltip={<GlossaryTooltip term="Wickets" />}>Wickets taken</FieldLabel>
            <input id="bsr-wickets" value={wickets} onChange={(event) => setWickets(event.target.value)} className={inputClass} inputMode="numeric" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className={buttonClass}>Calculate Bowling Strike Rate</button>
          <button type="button" onClick={reset} className={secondaryButtonClass}>Reset</button>
        </div>
      </form>
    </CalculatorShell>
  );
}

export function PartnershipRunRateCalculator() {
  const storageKey = "rkbsports:partnership-run-rate-recent";
  const [runs, setRuns] = useState("");
  const [overs, setOvers] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<ResultBlock | null>(null);
  const [recent, setRecent] = useState<RecentCalculation[]>([]);

  useEffect(() => setRecent(getRecent(storageKey)), []);

  function reset() {
    setRuns("");
    setOvers("");
    setErrors([]);
    setResult(null);
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = combineValidationResults(
      validateNumericInput(runs, { label: "Partnership runs", required: true, allowZero: true }),
      validateOversInput(overs, "Partnership overs"),
    );

    if (!validation.isValid) {
      setErrors(validation.errors);
      setResult(null);
      return;
    }

    const runValue = Number(runs);
    const balls = cricketOversToBalls(overs);
    const rate = runValue / cricketOversToDecimalOvers(overs);
    const summary = `Partnership RR: ${formatNumber(rate)} from ${runValue} in ${overs} overs.`;
    const nextResult = {
      title: `Partnership Run Rate ${formatNumber(rate)}`,
      lines: [
        `Partnership run rate: ${formatNumber(rate)}`,
        `Partnership runs: ${runValue}`,
        `Partnership overs: ${overs}`,
        `Balls equivalent: ${balls}`,
      ],
      explanation: `This partnership scored ${runValue} runs from ${balls} balls at ${formatNumber(rate)} runs per over.`,
    };

    setErrors([]);
    setResult(nextResult);
    setRecent(saveRecent(storageKey, summary));
  }

  return (
    <CalculatorShell title="Partnership run rate calculator" result={result} errors={errors} recent={recent}>
      <form onSubmit={calculate} className="mt-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="partnership-runs">Partnership runs</FieldLabel>
            <input id="partnership-runs" value={runs} onChange={(event) => setRuns(event.target.value)} className={inputClass} inputMode="decimal" />
          </div>
          <div>
            <FieldLabel htmlFor="partnership-overs" tooltip={<GlossaryTooltip term="Overs" />}>Partnership overs</FieldLabel>
            <input id="partnership-overs" value={overs} onChange={(event) => setOvers(event.target.value)} className={inputClass} inputMode="decimal" placeholder="8.4" />
            <OversHint value={overs} label="Partnership overs" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className={buttonClass}>Calculate Partnership RR</button>
          <button type="button" onClick={reset} className={secondaryButtonClass}>Reset</button>
        </div>
      </form>
    </CalculatorShell>
  );
}

export function BallsToOversConverter() {
  const storageKey = "rkbsports:balls-overs-converter-recent";
  const [balls, setBalls] = useState("");
  const [overs, setOvers] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<ResultBlock | null>(null);
  const [recent, setRecent] = useState<RecentCalculation[]>([]);

  useEffect(() => setRecent(getRecent(storageKey)), []);

  function reset() {
    setBalls("");
    setOvers("");
    setErrors([]);
    setResult(null);
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const hasBalls = balls.trim().length > 0;
    const hasOvers = overs.trim().length > 0;

    if (!hasBalls && !hasOvers) {
      setErrors(["Enter balls, cricket overs, or both."]);
      setResult(null);
      return;
    }

    const validation = combineValidationResults(
      hasBalls
        ? validateNumericInput(balls, { label: "Balls", required: true, allowZero: true })
        : { isValid: true, errors: [] },
      hasOvers ? validateOversInput(overs, "Cricket overs") : { isValid: true, errors: [] },
    );
    const nextErrors = [...validation.errors];
    const ballValue = Number(balls);

    if (hasBalls && !Number.isInteger(ballValue)) {
      nextErrors.push("Balls must be a whole number.");
    }

    if (nextErrors.length > 0) {
      setErrors(nextErrors);
      setResult(null);
      return;
    }

    const lines: string[] = [];
    let title = "Conversion complete";

    if (hasBalls) {
      const cricketOvers = ballsToCricketOvers(ballValue);
      const decimalOvers = ballValue / 6;
      title = `${ballValue} balls = ${cricketOvers} overs`;
      lines.push(`Balls: ${ballValue}`);
      lines.push(`Cricket overs: ${cricketOvers}`);
      lines.push(`Decimal overs: ${formatNumber(decimalOvers)}`);
    }

    if (hasOvers) {
      const convertedBalls = cricketOversToBalls(overs);
      lines.push(`Input overs: ${overs}`);
      lines.push(`Overs to balls: ${convertedBalls}`);
    }

    const summary = lines.join(", ");
    const nextResult = {
      title,
      lines,
      explanation:
        "Cricket overs use six-ball groups. For example, 4.3 means 4 overs and 3 balls, not 4.3 decimal overs.",
    };

    setErrors([]);
    setResult(nextResult);
    setRecent(saveRecent(storageKey, summary));
  }

  return (
    <CalculatorShell title="Balls to overs converter" result={result} errors={errors} recent={recent}>
      <form onSubmit={calculate} className="mt-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="converter-balls" tooltip={<GlossaryTooltip term="Balls" />}>Balls</FieldLabel>
            <input id="converter-balls" value={balls} onChange={(event) => setBalls(event.target.value)} className={inputClass} inputMode="numeric" placeholder="27" />
          </div>
          <div>
            <FieldLabel htmlFor="converter-overs" tooltip={<GlossaryTooltip term="Overs" />}>Cricket overs optional</FieldLabel>
            <input id="converter-overs" value={overs} onChange={(event) => setOvers(event.target.value)} className={inputClass} inputMode="decimal" placeholder="4.3" />
            <OversHint value={overs} label="Cricket overs" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className={buttonClass}>Convert</button>
          <button type="button" onClick={reset} className={secondaryButtonClass}>Reset</button>
        </div>
      </form>
    </CalculatorShell>
  );
}

export function TournamentQualificationScenarioPredictor() {
  const storageKey = "rkbsports:qualification-scenario-recent";
  const [currentPoints, setCurrentPoints] = useState("");
  const [currentNrr, setCurrentNrr] = useState("");
  const [matchesRemaining, setMatchesRemaining] = useState("");
  const [pointsPerWin, setPointsPerWin] = useState("2");
  const [targetPoints, setTargetPoints] = useState("");
  const [expectedWins, setExpectedWins] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<ResultBlock | null>(null);
  const [recent, setRecent] = useState<RecentCalculation[]>([]);

  useEffect(() => setRecent(getRecent(storageKey)), []);

  function reset() {
    setCurrentPoints("");
    setCurrentNrr("");
    setMatchesRemaining("");
    setPointsPerWin("2");
    setTargetPoints("");
    setExpectedWins("");
    setErrors([]);
    setResult(null);
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = combineValidationResults(
      validateNumericInput(currentPoints, { label: "Current points", required: true, allowZero: true }),
      validateNumericInput(currentNrr, { label: "Current NRR", required: true, allowZero: true, allowNegative: true }),
      validateNumericInput(matchesRemaining, { label: "Matches remaining", required: true, allowZero: true }),
      validateNumericInput(pointsPerWin, { label: "Points per win", required: true }),
      validateNumericInput(targetPoints, { label: "Target qualification points", required: true }),
      validateNumericInput(expectedWins, { label: "Expected wins", required: true, allowZero: true }),
    );
    const nextErrors = [...validation.errors];
    const remainingValue = Number(matchesRemaining);
    const expectedWinsValue = Number(expectedWins);

    if (expectedWinsValue > remainingValue) {
      nextErrors.push("Expected wins cannot exceed matches remaining.");
    }

    if (nextErrors.length > 0) {
      setErrors(nextErrors);
      setResult(null);
      return;
    }

    const pointsValue = Number(currentPoints);
    const nrrValue = Number(currentNrr);
    const winPointsValue = Number(pointsPerWin);
    const targetValue = Number(targetPoints);
    const projectedPoints = pointsValue + expectedWinsValue * winPointsValue;
    const pointsNeeded = Math.max(0, targetValue - pointsValue);
    const minimumWinsNeeded = Math.max(0, Math.ceil(pointsNeeded / winPointsValue));
    let status = "Need more wins";

    if (pointsValue >= targetValue) status = "Already safe";
    else if (projectedPoints >= targetValue) status = "Likely if target reached";
    else if (minimumWinsNeeded > remainingValue) status = "Mathematically difficult";

    const nrrNotes = [
      projectedPoints === targetValue
        ? "Projected points equal the target, so positive NRR may be important."
        : null,
      nrrValue < 0 ? "Current NRR is negative; improving NRR may help." : null,
    ].filter(Boolean);
    const summary = `Qualification scenario: ${projectedPoints} projected points. Status: ${status}.`;
    const nextResult = {
      title: `Projected Points ${projectedPoints}`,
      lines: [
        `Projected points: ${projectedPoints}`,
        `Points needed: ${pointsNeeded}`,
        `Minimum wins needed: ${minimumWinsNeeded}`,
        `Qualification status: ${status}`,
        `NRR note: ${nrrNotes.length > 0 ? nrrNotes.join(" ") : "No special NRR note for this scenario."}`,
      ],
      explanation:
        "This is a generic tournament scenario helper, not an official prediction and not live data.",
    };

    setErrors([]);
    setResult(nextResult);
    setRecent(saveRecent(storageKey, summary));
  }

  return (
    <CalculatorShell title="Tournament qualification scenario predictor" result={result} errors={errors} recent={recent}>
      <form onSubmit={calculate} className="mt-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div><FieldLabel htmlFor="qual-points">Current points</FieldLabel><input id="qual-points" value={currentPoints} onChange={(event) => setCurrentPoints(event.target.value)} className={inputClass} inputMode="decimal" /></div>
          <div><FieldLabel htmlFor="qual-nrr" tooltip={<GlossaryTooltip term="NRR" />}>Current NRR</FieldLabel><input id="qual-nrr" value={currentNrr} onChange={(event) => setCurrentNrr(event.target.value)} className={inputClass} inputMode="decimal" /></div>
          <div><FieldLabel htmlFor="qual-remaining">Matches remaining</FieldLabel><input id="qual-remaining" value={matchesRemaining} onChange={(event) => setMatchesRemaining(event.target.value)} className={inputClass} inputMode="decimal" /></div>
          <div><FieldLabel htmlFor="qual-points-win">Points per win</FieldLabel><input id="qual-points-win" value={pointsPerWin} onChange={(event) => setPointsPerWin(event.target.value)} className={inputClass} inputMode="decimal" /></div>
          <div><FieldLabel htmlFor="qual-target">Target qualification points</FieldLabel><input id="qual-target" value={targetPoints} onChange={(event) => setTargetPoints(event.target.value)} className={inputClass} inputMode="decimal" /></div>
          <div><FieldLabel htmlFor="qual-wins">Expected wins from remaining matches</FieldLabel><input id="qual-wins" value={expectedWins} onChange={(event) => setExpectedWins(event.target.value)} className={inputClass} inputMode="decimal" /></div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className={buttonClass}>Predict Scenario</button>
          <button type="button" onClick={reset} className={secondaryButtonClass}>Reset</button>
        </div>
      </form>
    </CalculatorShell>
  );
}
