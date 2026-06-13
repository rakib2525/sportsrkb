export type Tool = {
  name: string;
  slug: string;
  href: string;
  shortDescription: string;
  category:
    | "Team metrics"
    | "Batting metrics"
    | "Bowling metrics"
    | "Bowling analysis"
    | "Match planning"
    | "Tournament planning";
  relatedGuideSlug: string;
  statusLabel: "Available" | "Coming soon";
};

export const tools: Tool[] = [
  {
    name: "NRR Calculator",
    slug: "nrr-calculator",
    href: "/tools/nrr-calculator",
    shortDescription:
      "Plan net run rate scenarios with clear inputs for runs, overs, and match outcomes.",
    category: "Team metrics",
    relatedGuideSlug: "how-to-calculate-nrr-in-cricket",
    statusLabel: "Available",
  },
  {
    name: "Run Rate Calculator",
    slug: "run-rate-calculator",
    href: "/tools/run-rate-calculator",
    shortDescription:
      "Calculate current run rate from runs scored and overs faced in a cricket innings.",
    category: "Team metrics",
    relatedGuideSlug: "what-is-run-rate-in-cricket",
    statusLabel: "Available",
  },
  {
    name: "T20 Net Run Rate Calculator",
    slug: "t20-net-run-rate-calculator",
    href: "/tools/t20-net-run-rate-calculator",
    shortDescription:
      "Estimate net run rate in a 20-over context with T20-focused examples and default over hints.",
    category: "Team metrics",
    relatedGuideSlug: "how-to-calculate-nrr-in-cricket",
    statusLabel: "Available",
  },
  {
    name: "ODI Net Run Rate Calculator",
    slug: "odi-net-run-rate-calculator",
    href: "/tools/odi-net-run-rate-calculator",
    shortDescription:
      "Estimate net run rate for 50-over cricket using manual runs and overs inputs.",
    category: "Team metrics",
    relatedGuideSlug: "how-to-calculate-nrr-in-cricket",
    statusLabel: "Available",
  },
  {
    name: "T20 Run Rate Calculator",
    slug: "t20-run-rate-calculator",
    href: "/tools/t20-run-rate-calculator",
    shortDescription:
      "Calculate scoring pace in a T20 innings with 20-over context and cricket over validation.",
    category: "Team metrics",
    relatedGuideSlug: "t20-run-rate-strategy-guide",
    statusLabel: "Available",
  },
  {
    name: "ODI Run Rate Calculator",
    slug: "odi-run-rate-calculator",
    href: "/tools/odi-run-rate-calculator",
    shortDescription:
      "Calculate run rate for one-day cricket with 50-over context and safe over conversion.",
    category: "Team metrics",
    relatedGuideSlug: "odi-run-rate-strategy-guide",
    statusLabel: "Available",
  },
  {
    name: "Required Run Rate Calculator",
    slug: "required-run-rate-calculator",
    href: "/tools/required-run-rate-calculator",
    shortDescription:
      "Work out the scoring pace needed to reach a target from the current match position.",
    category: "Team metrics",
    relatedGuideSlug: "required-run-rate-explained",
    statusLabel: "Available",
  },
  {
    name: "Strike Rate Calculator",
    slug: "strike-rate-calculator",
    href: "/tools/strike-rate-calculator",
    shortDescription:
      "Convert runs and balls faced into batting strike rate for quick performance checks.",
    category: "Batting metrics",
    relatedGuideSlug: "strike-rate-in-cricket-explained",
    statusLabel: "Available",
  },
  {
    name: "Economy Rate Calculator",
    slug: "economy-rate-calculator",
    href: "/tools/economy-rate-calculator",
    shortDescription:
      "Calculate bowling economy using runs conceded and overs bowled.",
    category: "Bowling metrics",
    relatedGuideSlug: "what-is-a-good-economy-rate-in-t20-cricket",
    statusLabel: "Available",
  },
  {
    name: "Batting Average Calculator",
    slug: "batting-average-calculator",
    href: "/tools/batting-average-calculator",
    shortDescription:
      "Estimate batting average from total runs, dismissals, and innings records.",
    category: "Batting metrics",
    relatedGuideSlug: "batting-average-in-cricket-explained",
    statusLabel: "Available",
  },
  {
    name: "Bowling Average Calculator",
    slug: "bowling-average-calculator",
    href: "/tools/bowling-average-calculator",
    shortDescription:
      "Review bowling average using wickets taken and runs conceded.",
    category: "Bowling metrics",
    relatedGuideSlug: "what-is-a-good-economy-rate-in-t20-cricket",
    statusLabel: "Available",
  },
  {
    name: "Bowling Strike Rate Calculator",
    slug: "bowling-strike-rate-calculator",
    href: "/tools/bowling-strike-rate-calculator",
    shortDescription:
      "Calculate balls per wicket from balls bowled and wickets taken, with safe zero-wicket handling.",
    category: "Bowling metrics",
    relatedGuideSlug: "bowling-economy-vs-bowling-average",
    statusLabel: "Available",
  },
  {
    name: "Partnership Run Rate Calculator",
    slug: "partnership-run-rate-calculator",
    href: "/tools/partnership-run-rate-calculator",
    shortDescription:
      "Calculate the run rate of a batting partnership using runs and cricket overs.",
    category: "Batting metrics",
    relatedGuideSlug: "what-is-run-rate-in-cricket",
    statusLabel: "Available",
  },
  {
    name: "Balls to Overs Converter",
    slug: "balls-to-overs-converter",
    href: "/tools/balls-to-overs-converter",
    shortDescription:
      "Convert legal balls to cricket overs and cricket overs back to balls.",
    category: "Team metrics",
    relatedGuideSlug: "how-to-convert-balls-to-overs-in-cricket",
    statusLabel: "Available",
  },
  {
    name: "Follow-On Calculator",
    slug: "follow-on-calculator",
    href: "/tools/follow-on-calculator",
    shortDescription:
      "Check whether a follow-on can be enforced using common multi-day cricket lead thresholds.",
    category: "Match planning",
    relatedGuideSlug: "follow-on-rule-in-test-cricket",
    statusLabel: "Available",
  },
  {
    name: "Super Over Target Calculator",
    slug: "super-over-target-calculator",
    href: "/tools/super-over-target-calculator",
    shortDescription:
      "Plan a super over chase with target, balls remaining, and required runs per ball.",
    category: "Match planning",
    relatedGuideSlug: "required-run-rate-explained",
    statusLabel: "Available",
  },
  {
    name: "Bowler's Spell Analyzer",
    slug: "bowlers-spell-analyzer",
    href: "/tools/bowlers-spell-analyzer",
    shortDescription:
      "Analyze a bowling spell using economy rate, dot ball percentage, boundaries, and extras.",
    category: "Bowling analysis",
    relatedGuideSlug: "what-is-a-good-economy-rate-in-t20-cricket",
    statusLabel: "Available",
  },
  {
    name: "Target Run Rate Chase Planner",
    slug: "target-run-rate-chase-planner",
    href: "/tools/target-run-rate-chase-planner",
    shortDescription:
      "Build aggressive, balanced, and late-charge chase plans from target and overs.",
    category: "Match planning",
    relatedGuideSlug: "required-run-rate-explained",
    statusLabel: "Available",
  },
  {
    name: "Fantasy Cricket Points Calculator",
    slug: "fantasy-cricket-points-calculator",
    href: "/tools/fantasy-cricket-points-calculator",
    shortDescription:
      "Estimate generic fantasy cricket points from batting, bowling, fielding, and bonus inputs.",
    category: "Match planning",
    relatedGuideSlug: "strike-rate-in-cricket-explained",
    statusLabel: "Available",
  },
  {
    name: "Tournament Qualification Scenario Predictor",
    slug: "tournament-qualification-scenario-predictor",
    href: "/tools/tournament-qualification-scenario-predictor",
    shortDescription:
      "Project points, minimum wins, and NRR notes for generic tournament qualification scenarios.",
    category: "Tournament planning",
    relatedGuideSlug: "how-to-calculate-nrr-in-cricket",
    statusLabel: "Available",
  },
  {
    name: "Points Table Calculator",
    slug: "points-table-calculator",
    href: "/tools/points-table-calculator",
    shortDescription:
      "Create a manual cricket points table with NRR, rankings, saved local drafts, and editable team stats.",
    category: "Tournament planning",
    relatedGuideSlug: "cricket-points-table-rules-explained",
    statusLabel: "Available",
  },
];

export function getToolBySlug(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByGuideSlug(guideSlug: string) {
  return tools.filter((tool) => tool.relatedGuideSlug === guideSlug);
}
