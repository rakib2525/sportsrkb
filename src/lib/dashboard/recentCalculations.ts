export type DashboardRecentCalculation = {
  id: string;
  calculatorName: string;
  calculatorHref: string;
  storageKey: string;
  summary: string;
  timestamp?: string;
};

type StoredRecentCalculation = {
  id?: string;
  summary?: string;
  timestamp?: string;
};

export const recentCalculationSources = [
  { key: "rkbsports:run-rate-recent", name: "Run Rate Calculator", href: "/tools/run-rate-calculator" },
  { key: "rkbsports:t20-run-rate-recent", name: "T20 Run Rate Calculator", href: "/tools/t20-run-rate-calculator" },
  { key: "rkbsports:odi-run-rate-recent", name: "ODI Run Rate Calculator", href: "/tools/odi-run-rate-calculator" },
  { key: "rkbsports:required-run-rate-recent", name: "Required Run Rate Calculator", href: "/tools/required-run-rate-calculator" },
  { key: "rkbsports:nrr-recent", name: "NRR Calculator", href: "/tools/nrr-calculator" },
  { key: "rkbsports:t20-nrr-recent", name: "T20 Net Run Rate Calculator", href: "/tools/t20-net-run-rate-calculator" },
  { key: "rkbsports:odi-nrr-recent", name: "ODI Net Run Rate Calculator", href: "/tools/odi-net-run-rate-calculator" },
  { key: "rkbsports:strike-rate-recent", name: "Strike Rate Calculator", href: "/tools/strike-rate-calculator" },
  { key: "rkbsports:economy-rate-recent", name: "Economy Rate Calculator", href: "/tools/economy-rate-calculator" },
  { key: "rkbsports:batting-average-recent", name: "Batting Average Calculator", href: "/tools/batting-average-calculator" },
  { key: "rkbsports:bowling-average-recent", name: "Bowling Average Calculator", href: "/tools/bowling-average-calculator" },
  { key: "rkbsports:bowling-strike-rate-recent", name: "Bowling Strike Rate Calculator", href: "/tools/bowling-strike-rate-calculator" },
  { key: "rkbsports:super-over-target-recent", name: "Super Over Target Calculator", href: "/tools/super-over-target-calculator" },
  { key: "rkbsports:bowlers-spell-recent", name: "Bowler's Spell Analyzer", href: "/tools/bowlers-spell-analyzer" },
  { key: "rkbsports:target-chase-planner-recent", name: "Target Run Rate Chase Planner", href: "/tools/target-run-rate-chase-planner" },
  { key: "rkbsports:fantasy-points-recent", name: "Fantasy Cricket Points Calculator", href: "/tools/fantasy-cricket-points-calculator" },
  { key: "rkbsports:qualification-scenario-recent", name: "Tournament Qualification Scenario Predictor", href: "/tools/tournament-qualification-scenario-predictor" },
  { key: "rkbsports:follow-on-recent", name: "Follow-On Calculator", href: "/tools/follow-on-calculator" },
  { key: "rkbsports:partnership-run-rate-recent", name: "Partnership Run Rate Calculator", href: "/tools/partnership-run-rate-calculator" },
  { key: "rkbsports:balls-overs-converter-recent", name: "Balls to Overs Converter", href: "/tools/balls-to-overs-converter" },
];

export function readAllRecentCalculations(): DashboardRecentCalculation[] {
  return recentCalculationSources
    .flatMap((source) => {
      try {
        const rawValue = window.localStorage.getItem(source.key);
        const parsed = rawValue ? (JSON.parse(rawValue) as StoredRecentCalculation[]) : [];

        if (!Array.isArray(parsed)) {
          return [];
        }

        return parsed
          .filter((item) => typeof item?.summary === "string")
          .map((item, index) => ({
            id: item.id || `${source.key}-${index}`,
            calculatorName: source.name,
            calculatorHref: source.href,
            storageKey: source.key,
            summary: item.summary || "",
            timestamp: item.timestamp || inferTimestampFromId(item.id),
          }));
      } catch {
        return [];
      }
    })
    .sort((a, b) => {
      const aTime = a.timestamp ? Date.parse(a.timestamp) : 0;
      const bTime = b.timestamp ? Date.parse(b.timestamp) : 0;
      return bTime - aTime;
    });
}

export function clearAllRecentCalculations() {
  for (const source of recentCalculationSources) {
    window.localStorage.removeItem(source.key);
  }
}

function inferTimestampFromId(id?: string) {
  if (!id) {
    return undefined;
  }

  const timestamp = Number(id);
  if (!Number.isFinite(timestamp)) {
    return undefined;
  }

  return new Date(timestamp).toISOString();
}
