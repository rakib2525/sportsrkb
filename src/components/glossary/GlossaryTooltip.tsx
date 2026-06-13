"use client";

import { useState } from "react";

const glossary = {
  NRR: "Net run rate compares a team's scoring rate with the rate it concedes across relevant matches.",
  "Run Rate": "Run rate is runs scored per over.",
  "Required Run Rate":
    "Required run rate is the scoring pace needed to reach a target from the remaining overs.",
  "Strike Rate": "Batting strike rate is runs scored per 100 balls faced.",
  "Economy Rate": "Economy rate is runs conceded per over bowled.",
  "Batting Average": "Batting average is total runs divided by times dismissed.",
  "Bowling Average": "Bowling average is runs conceded divided by wickets taken.",
  Overs: "Overs are groups of six legal balls. Cricket notation like 4.3 means 4 overs and 3 balls.",
  Balls: "Balls are legal deliveries bowled in an innings or faced by a batter.",
  Wickets: "Wickets usually mean dismissals taken by the bowling side or wickets lost by the batting side.",
} as const;

export type GlossaryTerm = keyof typeof glossary;

type GlossaryTooltipProps = {
  term: GlossaryTerm;
};

export function GlossaryTooltip({ term }: GlossaryTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="rounded border-b border-dotted border-emerald-700 font-bold text-emerald-800 underline-offset-4 hover:text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-emerald-300 dark:text-emerald-300 dark:hover:text-emerald-200"
        aria-expanded={isOpen}
      >
        {term}
      </button>
      {isOpen ? (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 z-20 mb-2 w-64 -translate-x-1/2 rounded border border-slate-200 bg-white p-3 text-left text-xs font-medium leading-5 text-slate-700 shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          {glossary[term]}
        </span>
      ) : null}
    </span>
  );
}
