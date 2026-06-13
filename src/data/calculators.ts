import type { GlossaryTerm } from "@/components/glossary/GlossaryTooltip";

export type CalculatorPageData = {
  name: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  description: string[];
  formula: {
    title: string;
    value: string;
    note: string;
  };
  example: {
    title: string;
    steps: string[];
  };
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedToolSlugs: string[];
  relatedGuideSlugs: string[];
  glossaryTerms: GlossaryTerm[];
};

export const calculatorPages: CalculatorPageData[] = [
  {
    name: "NRR Calculator",
    slug: "nrr-calculator",
    metaTitle: "NRR Calculator",
    metaDescription:
      "Use the RKBSports.app NRR Calculator page structure for net run rate formulas, examples, FAQs, related tools, and related cricket guides.",
    intro:
      "Estimate net run rate from your team's scoring rate and the opponent scoring rate using cricket over format.",
    description: [
      "Net run rate is often used to rank teams in cricket league tables when points alone do not separate them.",
      "Enter your own match or tournament figures manually. No fake match data or demo API feed is used on this page.",
    ],
    formula: {
      title: "NRR formula",
      value: "Net run rate = team run rate scored - team run rate conceded",
      note: "Official competitions may apply special rules for all-out innings and shortened matches.",
    },
    example: {
      title: "Example",
      steps: [
        "Team A scores at 6.20 runs per over across counted matches.",
        "Team A concedes at 5.80 runs per over across counted matches.",
        "The simplified NRR is 6.20 - 5.80 = +0.40.",
      ],
    },
    faqs: [
      {
        question: "Is this a live score tool?",
        answer:
          "No. This page is for cricket calculations and explanatory content only.",
      },
      {
        question: "Why do official NRR tables sometimes differ?",
        answer:
          "Tournament rules can adjust how overs are counted for all-out or reduced-over innings.",
      },
    ],
    relatedToolSlugs: ["run-rate-calculator", "required-run-rate-calculator"],
    relatedGuideSlugs: ["how-to-calculate-nrr-in-cricket", "what-is-run-rate-in-cricket"],
    glossaryTerms: ["NRR", "Run Rate", "Overs", "Balls", "Wickets"],
  },
  {
    name: "Run Rate Calculator",
    slug: "run-rate-calculator",
    metaTitle: "Run Rate Calculator",
    metaDescription:
      "Use the RKBSports.app Run Rate Calculator page structure with run rate formula, cricket over notes, examples, FAQs, and related guides.",
    intro:
      "Calculate cricket run rate from runs scored and overs faced, including cricket notation such as 4.3 overs.",
    description: [
      "Run rate shows how quickly a batting side is scoring in an innings.",
      "The calculator validates cricket over notation and rejects values such as 4.6 overs with a friendly message.",
    ],
    formula: {
      title: "Run rate formula",
      value: "Run rate = runs scored / overs faced",
      note: "Use cricket overs correctly: 4.3 means 4 overs and 3 balls, not 4.3 decimal overs.",
    },
    example: {
      title: "Example",
      steps: [
        "A team scores 96 runs in 12 overs.",
        "96 divided by 12 equals 8.00.",
        "The run rate is 8.00 runs per over.",
      ],
    },
    faqs: [
      {
        question: "Can overs be entered as 4.6?",
        answer:
          "No. In cricket notation, 4.6 is invalid because six balls complete the next over.",
      },
      {
        question: "Does run rate include wickets?",
        answer:
          "No. Run rate only uses runs and overs, though wickets affect match context.",
      },
    ],
    relatedToolSlugs: ["required-run-rate-calculator", "nrr-calculator"],
    relatedGuideSlugs: ["what-is-run-rate-in-cricket", "required-run-rate-explained"],
    glossaryTerms: ["Run Rate", "Overs", "Balls", "Wickets"],
  },
  {
    name: "Required Run Rate Calculator",
    slug: "required-run-rate-calculator",
    metaTitle: "Required Run Rate Calculator",
    metaDescription:
      "Use the RKBSports.app Required Run Rate Calculator page structure with formula, example chase scenario, FAQs, and related cricket tools.",
    intro:
      "Calculate the run rate needed to chase a target from the current score and overs remaining.",
    description: [
      "Required run rate tells a chasing team how many runs per over it needs from the remaining overs.",
      "Use the format controls for T20, ODI, Test, or Custom totals, then enter the chase situation manually.",
    ],
    formula: {
      title: "Required run rate formula",
      value: "Required run rate = runs required / overs remaining",
      note: "Runs required normally means target score minus current score.",
    },
    example: {
      title: "Example",
      steps: [
        "A team needs 54 runs from 6 overs.",
        "54 divided by 6 equals 9.00.",
        "The required run rate is 9.00 runs per over.",
      ],
    },
    faqs: [
      {
        question: "Does required run rate change after every ball?",
        answer:
          "Yes. Runs scored and balls used both change the equation during a chase.",
      },
      {
        question: "Is required run rate enough to predict a chase?",
        answer:
          "No. Wickets, batting strength, pitch, and boundary size also matter.",
      },
    ],
    relatedToolSlugs: ["run-rate-calculator", "nrr-calculator"],
    relatedGuideSlugs: ["required-run-rate-explained", "what-is-run-rate-in-cricket"],
    glossaryTerms: ["Required Run Rate", "Run Rate", "Overs", "Balls", "Wickets"],
  },
  {
    name: "Strike Rate Calculator",
    slug: "strike-rate-calculator",
    metaTitle: "Strike Rate Calculator",
    metaDescription:
      "Calculate cricket batting strike rate from runs scored and balls faced with examples, FAQs, related tools, and cricket guides.",
    intro:
      "Calculate batting strike rate from runs scored and balls faced, then read a simple interpretation of scoring speed.",
    description: [
      "Batting strike rate shows how quickly a batter scores per 100 balls faced.",
      "This calculator uses manual inputs only and does not rely on live scores, player feeds, or demo API data.",
    ],
    formula: {
      title: "Strike rate formula",
      value: "Strike rate = (runs scored / balls faced) x 100",
      note: "Balls faced should be legal deliveries faced by the batter.",
    },
    example: {
      title: "Example",
      steps: [
        "A batter scores 48 runs from 32 balls.",
        "48 divided by 32 equals 1.5.",
        "1.5 multiplied by 100 gives a strike rate of 150.00.",
      ],
    },
    faqs: [
      {
        question: "Can strike rate be calculated with zero balls?",
        answer:
          "No. Balls faced must be greater than zero because division by zero is not possible.",
      },
      {
        question: "Is a higher strike rate always better?",
        answer:
          "A higher strike rate means faster scoring, but match format, conditions, and batting role still matter.",
      },
    ],
    relatedToolSlugs: ["batting-average-calculator", "run-rate-calculator"],
    relatedGuideSlugs: ["strike-rate-in-cricket-explained", "batting-average-in-cricket-explained"],
    glossaryTerms: ["Strike Rate", "Balls", "Batting Average"],
  },
  {
    name: "Economy Rate Calculator",
    slug: "economy-rate-calculator",
    metaTitle: "Economy Rate Calculator",
    metaDescription:
      "Calculate cricket bowling economy rate from runs conceded and overs bowled, including cricket over notation such as 4.3 overs.",
    intro:
      "Calculate bowling economy rate using runs conceded and overs bowled in cricket format.",
    description: [
      "Economy rate shows how many runs a bowler concedes per over.",
      "The calculator accepts cricket over notation, so 4.3 means 4 overs and 3 balls.",
    ],
    formula: {
      title: "Economy rate formula",
      value: "Economy rate = runs conceded / overs bowled",
      note: "Convert cricket overs safely before calculation. For example, 4.3 overs equals 27 balls.",
    },
    example: {
      title: "Example",
      steps: [
        "A bowler concedes 35 runs in 4 overs.",
        "35 divided by 4 equals 8.75.",
        "The economy rate is 8.75 runs per over.",
      ],
    },
    faqs: [
      {
        question: "Can I enter 4.6 overs?",
        answer:
          "No. In cricket notation, 4.6 is invalid because six balls complete the next over.",
      },
      {
        question: "What does a lower economy rate mean?",
        answer:
          "A lower economy rate means the bowler conceded fewer runs per over.",
      },
    ],
    relatedToolSlugs: ["bowling-average-calculator", "nrr-calculator"],
    relatedGuideSlugs: ["what-is-a-good-economy-rate-in-t20-cricket"],
    glossaryTerms: ["Economy Rate", "Overs", "Balls", "Bowling Average"],
  },
  {
    name: "Batting Average Calculator",
    slug: "batting-average-calculator",
    metaTitle: "Batting Average Calculator",
    metaDescription:
      "Calculate cricket batting average from total runs and dismissals with friendly handling for not-out records.",
    intro:
      "Calculate batting average from total runs and dismissals, with a safe message for zero dismissals.",
    description: [
      "Batting average measures how many runs a batter scores per dismissal.",
      "If dismissals are zero, normal division cannot calculate an average because the batter has not been dismissed.",
    ],
    formula: {
      title: "Batting average formula",
      value: "Batting average = total runs / dismissals",
      note: "Not-out innings add runs but do not add dismissals.",
    },
    example: {
      title: "Example",
      steps: [
        "A batter has 420 runs and 14 dismissals.",
        "420 divided by 14 equals 30.00.",
        "The batting average is 30.00.",
      ],
    },
    faqs: [
      {
        question: "What happens if dismissals are zero?",
        answer:
          "The calculator shows that a not-out average cannot be calculated by normal division.",
      },
      {
        question: "Do not-outs count as dismissals?",
        answer:
          "No. Runs from not-out innings count, but the innings does not add a dismissal.",
      },
    ],
    relatedToolSlugs: ["strike-rate-calculator", "run-rate-calculator"],
    relatedGuideSlugs: ["batting-average-in-cricket-explained", "strike-rate-in-cricket-explained"],
    glossaryTerms: ["Batting Average", "Strike Rate"],
  },
  {
    name: "Bowling Average Calculator",
    slug: "bowling-average-calculator",
    metaTitle: "Bowling Average Calculator",
    metaDescription:
      "Calculate cricket bowling average from runs conceded and wickets taken with friendly zero-wicket handling.",
    intro:
      "Calculate bowling average from runs conceded and wickets taken, with safe handling when wickets are zero.",
    description: [
      "Bowling average measures how many runs a bowler concedes per wicket taken.",
      "If wickets are zero, normal division cannot calculate a bowling average.",
    ],
    formula: {
      title: "Bowling average formula",
      value: "Bowling average = runs conceded / wickets taken",
      note: "Wickets must be greater than zero for a normal bowling average calculation.",
    },
    example: {
      title: "Example",
      steps: [
        "A bowler concedes 120 runs and takes 6 wickets.",
        "120 divided by 6 equals 20.00.",
        "The bowling average is 20.00.",
      ],
    },
    faqs: [
      {
        question: "What happens if wickets are zero?",
        answer:
          "The calculator shows a friendly warning because dividing by zero is not possible.",
      },
      {
        question: "Is lower bowling average better?",
        answer:
          "Usually yes. A lower bowling average means fewer runs conceded per wicket.",
      },
    ],
    relatedToolSlugs: ["economy-rate-calculator", "nrr-calculator"],
    relatedGuideSlugs: ["what-is-a-good-economy-rate-in-t20-cricket"],
    glossaryTerms: ["Bowling Average", "Economy Rate", "Wickets"],
  },
  {
    name: "Super Over Target Calculator",
    slug: "super-over-target-calculator",
    metaTitle: "Super Over Target Calculator",
    metaDescription:
      "Calculate a super over chase target, runs needed, balls remaining, required runs per ball, and required run rate equivalent.",
    intro:
      "Plan a super over chase from the first team's score and the chasing team's current position.",
    description: [
      "A super over has six legal balls and a maximum of two wickets for the batting side.",
      "This tool uses only manual inputs and simple cricket math. It does not use live scores, team branding, logos, or external match feeds.",
    ],
    formula: {
      title: "Super over chase formula",
      value: "Target = first team runs + 1; runs needed = target - current score",
      note: "Required runs per ball uses balls remaining from a six-ball super over.",
    },
    example: {
      title: "Example",
      steps: [
        "First team scores 14 runs, so the target to win is 15.",
        "The chasing team has 8 runs after 3 balls.",
        "They need 7 runs from 3 balls, or 2.33 runs per ball.",
      ],
    },
    faqs: [
      {
        question: "Can wickets lost be more than two?",
        answer:
          "No. A super over innings ends after two wickets, so this calculator rejects values above two.",
      },
      {
        question: "Is this connected to live super over scores?",
        answer:
          "No. It is a manual planning calculator only.",
      },
    ],
    relatedToolSlugs: ["required-run-rate-calculator", "target-run-rate-chase-planner"],
    relatedGuideSlugs: ["required-run-rate-explained", "what-is-run-rate-in-cricket"],
    glossaryTerms: ["Required Run Rate", "Run Rate", "Balls", "Wickets"],
  },
  {
    name: "Bowler's Spell Analyzer",
    slug: "bowlers-spell-analyzer",
    metaTitle: "Bowler's Spell Analyzer",
    metaDescription:
      "Analyze a cricket bowling spell with economy rate, dot ball percentage, boundary frequency, extras, and a simple performance verdict.",
    intro:
      "Review a bowling spell using economy, dot balls, boundaries, extras, wickets, and a simple performance score.",
    description: [
      "A bowling spell is more than wickets alone. Dot balls, boundary control, extras, and economy all help describe the spell.",
      "This analyzer is a manual cricket tool and does not use player photos, team logos, official branding, or live score data.",
    ],
    formula: {
      title: "Spell analysis formulas",
      value: "Economy = runs / overs; dot % = dot balls / legal balls x 100",
      note: "Boundary frequency is boundaries conceded divided by legal balls. Extras count wides plus no balls.",
    },
    example: {
      title: "Example",
      steps: [
        "A bowler bowls 4 overs, concedes 24 runs, takes 2 wickets, and bowls 12 dot balls.",
        "Economy is 6.00 and dot ball percentage is 50.00%.",
        "The verdict combines economy, wickets, dot pressure, boundaries, and extras.",
      ],
    },
    faqs: [
      {
        question: "Can dot balls exceed legal balls?",
        answer:
          "No. Dot balls are legal deliveries, so they cannot be higher than the legal balls bowled.",
      },
      {
        question: "Is the performance score official?",
        answer:
          "No. It is a simple manual helper score for quick analysis.",
      },
    ],
    relatedToolSlugs: ["economy-rate-calculator", "bowling-average-calculator"],
    relatedGuideSlugs: ["what-is-a-good-economy-rate-in-t20-cricket"],
    glossaryTerms: ["Economy Rate", "Overs", "Balls", "Wickets"],
  },
  {
    name: "Target Run Rate Chase Planner",
    slug: "target-run-rate-chase-planner",
    metaTitle: "Target Run Rate Chase Planner",
    metaDescription:
      "Create aggressive, balanced, and late-charge cricket chase plans from target score, total overs, current score, and overs completed.",
    intro:
      "Plan a cricket chase with overall required rate and phase-wise aggressive, balanced, and late-charge approaches.",
    description: [
      "This chase planner breaks a target into practical phase targets such as powerplay, middle overs, and death overs.",
      "The plans are calculation helpers only, not predictions and not live match advice.",
    ],
    formula: {
      title: "Chase planner formula",
      value: "Required rate = runs needed / overs remaining",
      note: "Phase plans split the remaining runs into different scoring patterns for manual planning.",
    },
    example: {
      title: "Example",
      steps: [
        "Target is 181 and current score is 60 after 8 overs in a T20.",
        "Runs needed are 121 from 72 balls.",
        "The planner shows different ways to distribute those runs across remaining phases.",
      ],
    },
    faqs: [
      {
        question: "Are the chase plans predictions?",
        answer:
          "No. They are planning helpers based on arithmetic, not fake forecasts.",
      },
      {
        question: "Can I use custom total overs?",
        answer:
          "Yes. Select Custom and enter the total overs in cricket format.",
      },
    ],
    relatedToolSlugs: ["required-run-rate-calculator", "run-rate-calculator"],
    relatedGuideSlugs: ["required-run-rate-explained", "what-is-run-rate-in-cricket"],
    glossaryTerms: ["Required Run Rate", "Run Rate", "Overs", "Balls"],
  },
  {
    name: "Fantasy Cricket Points Calculator",
    slug: "fantasy-cricket-points-calculator",
    metaTitle: "Fantasy Cricket Points Calculator",
    metaDescription:
      "Calculate generic fantasy cricket points from runs, boundaries, wickets, catches, run outs, stumpings, and maidens.",
    intro:
      "Estimate generic fantasy cricket points with a clear point system for batting, bowling, fielding, and bonuses.",
    description: [
      "This calculator uses generic fantasy cricket scoring only. Actual fantasy platform rules may differ.",
      "No fantasy platform names, official branding, player photos, live scores, or API data are used.",
    ],
    formula: {
      title: "Generic fantasy points formula",
      value:
        "Total = batting points + bowling points + fielding points + bonus points",
      note: "Runs are 1 point, fours 1 bonus point, sixes 2 bonus points, wickets 25, catches 8, run out/stumping 12, and maidens 12.",
    },
    example: {
      title: "Example",
      steps: [
        "A player scores 40 runs with 4 fours and 2 sixes.",
        "They also take 2 wickets and 1 catch.",
        "Total points are calculated from the generic scoring table shown on the page.",
      ],
    },
    faqs: [
      {
        question: "Does this match a specific fantasy platform?",
        answer:
          "No. It is a generic calculator and actual platform rules may differ.",
      },
      {
        question: "Are economy and strike rate bonuses included?",
        answer:
          "They are optional reference inputs in this phase, but the visible generic point system does not apply platform-specific bonuses.",
      },
    ],
    relatedToolSlugs: ["strike-rate-calculator", "economy-rate-calculator"],
    relatedGuideSlugs: ["strike-rate-in-cricket-explained", "what-is-a-good-economy-rate-in-t20-cricket"],
    glossaryTerms: ["Strike Rate", "Economy Rate", "Wickets", "Balls"],
  },
  {
    name: "Tournament Qualification Scenario Predictor",
    slug: "tournament-qualification-scenario-predictor",
    metaTitle: "Tournament Qualification Scenario Predictor",
    metaDescription:
      "Project generic tournament qualification scenarios from current points, NRR, matches remaining, and expected wins.",
    intro:
      "Project points, minimum wins, and NRR notes for a generic tournament qualification scenario.",
    description: [
      "This is a manual scenario helper, not an official prediction and not live standings.",
      "Use generic tournament inputs only. No official league names, team branding, fake teams, or live data are included.",
    ],
    formula: {
      title: "Qualification scenario formula",
      value: "Projected points = current points + expected wins x points per win",
      note: "Minimum wins needed is based on points still needed divided by points per win.",
    },
    example: {
      title: "Example",
      steps: [
        "A team has 10 points, 3 matches remaining, and gets 2 points per win.",
        "If expected wins are 2, projected points are 14.",
        "The tool compares projected points with the target qualification points and adds NRR notes.",
      ],
    },
    faqs: [
      {
        question: "Is this an official qualification prediction?",
        answer:
          "No. It is a generic scenario helper based on manual inputs.",
      },
      {
        question: "Does NRR decide qualification here?",
        answer:
          "The tool only adds NRR notes. Official tournament rules and tables may vary.",
      },
    ],
    relatedToolSlugs: ["nrr-calculator", "target-run-rate-chase-planner"],
    relatedGuideSlugs: ["how-to-calculate-nrr-in-cricket", "required-run-rate-explained"],
    glossaryTerms: ["NRR", "Run Rate"],
  },
  {
    name: "T20 Net Run Rate Calculator",
    slug: "t20-net-run-rate-calculator",
    metaTitle: "T20 Net Run Rate Calculator",
    metaDescription:
      "Estimate T20 net run rate with 20-over context, cricket over validation, examples, FAQs, and related NRR guides.",
    intro:
      "Calculate a simple T20 net run rate estimate from runs scored, overs faced, runs conceded, and overs bowled.",
    description: [
      "T20 NRR can move quickly because each innings has only 120 legal balls in a full match.",
      "This page uses manual inputs only and provides 20-over context without live scores, official team branding, or API data.",
    ],
    formula: {
      title: "T20 NRR formula",
      value: "T20 NRR = team run rate - opponent run rate",
      note: "For a full T20 innings, 20 overs equals 120 legal balls. Official tables may treat all-out or shortened innings differently.",
    },
    example: {
      title: "T20 example",
      steps: [
        "A team scores 168 in 20 overs, so its scoring rate is 8.40.",
        "It concedes 150 in 20 overs, so the opponent rate is 7.50.",
        "The simple T20 NRR estimate is +0.90.",
      ],
    },
    faqs: [
      {
        question: "Is this an official T20 table calculator?",
        answer:
          "No. It is a manual NRR estimator. Tournament rules can adjust official calculations.",
      },
      {
        question: "Why does T20 NRR change quickly?",
        answer:
          "A full T20 innings has fewer balls, so large wins or heavy defeats can have a noticeable rate impact.",
      },
    ],
    relatedToolSlugs: ["nrr-calculator", "t20-run-rate-calculator"],
    relatedGuideSlugs: ["how-to-calculate-nrr-in-cricket", "t20-run-rate-strategy-guide"],
    glossaryTerms: ["NRR", "Run Rate", "Overs", "Balls"],
  },
  {
    name: "ODI Net Run Rate Calculator",
    slug: "odi-net-run-rate-calculator",
    metaTitle: "ODI Net Run Rate Calculator",
    metaDescription:
      "Estimate ODI net run rate in a 50-over context with manual runs and overs inputs, examples, FAQs, and related guides.",
    intro:
      "Calculate a simple ODI net run rate estimate using scoring and conceded rates in one-day cricket context.",
    description: [
      "ODI NRR is often discussed in group tables because teams may finish level on points.",
      "This page gives 50-over context while keeping the calculation manual, fast, and free of live or branded match data.",
    ],
    formula: {
      title: "ODI NRR formula",
      value: "ODI NRR = run rate scored - run rate conceded",
      note: "For a full ODI innings, 50 overs equals 300 legal balls. Official tournament handling can vary.",
    },
    example: {
      title: "ODI example",
      steps: [
        "A team scores 275 in 50 overs, so its run rate is 5.50.",
        "It concedes 250 in 50 overs, so the conceded rate is 5.00.",
        "The simplified ODI NRR estimate is +0.50.",
      ],
    },
    faqs: [
      {
        question: "Can I use partial ODI overs?",
        answer:
          "Yes. Use cricket notation such as 47.3 for 47 overs and 3 balls.",
      },
      {
        question: "Does this page use live standings?",
        answer:
          "No. It uses only the numbers you enter manually.",
      },
    ],
    relatedToolSlugs: ["nrr-calculator", "odi-run-rate-calculator"],
    relatedGuideSlugs: ["how-to-calculate-nrr-in-cricket", "odi-run-rate-strategy-guide"],
    glossaryTerms: ["NRR", "Run Rate", "Overs", "Balls"],
  },
  {
    name: "T20 Run Rate Calculator",
    slug: "t20-run-rate-calculator",
    metaTitle: "T20 Run Rate Calculator",
    metaDescription:
      "Calculate T20 run rate from runs and overs with 20-over context, cricket over validation, examples, and FAQs.",
    intro:
      "Work out scoring pace in a T20 innings using runs scored and overs faced.",
    description: [
      "T20 run rate helps judge whether a batting side is moving fast enough across a short 120-ball innings.",
      "Use cricket over notation correctly, such as 6.4 for 6 overs and 4 balls.",
    ],
    formula: {
      title: "T20 run rate formula",
      value: "T20 run rate = runs scored / overs faced",
      note: "A full T20 innings is usually 20 overs, but reduced matches can have fewer overs.",
    },
    example: {
      title: "T20 example",
      steps: [
        "A team scores 92 runs after 10 overs.",
        "92 divided by 10 equals 9.20.",
        "The T20 run rate is 9.20 runs per over.",
      ],
    },
    faqs: [
      {
        question: "Does this predict a T20 score?",
        answer:
          "No. It calculates current scoring rate only, using manual inputs.",
      },
      {
        question: "Can I enter 4.6 overs?",
        answer:
          "No. Six balls complete the next over, so use 5.0 instead.",
      },
    ],
    relatedToolSlugs: ["run-rate-calculator", "required-run-rate-calculator"],
    relatedGuideSlugs: ["t20-run-rate-strategy-guide", "what-is-run-rate-in-cricket"],
    glossaryTerms: ["Run Rate", "Overs", "Balls"],
  },
  {
    name: "ODI Run Rate Calculator",
    slug: "odi-run-rate-calculator",
    metaTitle: "ODI Run Rate Calculator",
    metaDescription:
      "Calculate ODI run rate from runs and overs with 50-over context, practical examples, FAQs, and related guides.",
    intro:
      "Calculate scoring pace in a one-day innings using runs scored and overs faced.",
    description: [
      "ODI run rate is useful across the first 10 overs, middle overs, and final acceleration phase.",
      "This calculator keeps the math simple while preserving cricket over notation for partial overs.",
    ],
    formula: {
      title: "ODI run rate formula",
      value: "ODI run rate = runs scored / overs faced",
      note: "A full ODI innings is usually 50 overs, equal to 300 legal balls.",
    },
    example: {
      title: "ODI example",
      steps: [
        "A team scores 140 after 28 overs.",
        "140 divided by 28 equals 5.00.",
        "The ODI run rate is 5.00 runs per over.",
      ],
    },
    faqs: [
      {
        question: "Is ODI run rate different from T20 run rate?",
        answer:
          "The formula is the same, but the match context is different because an ODI innings is longer.",
      },
      {
        question: "Can this handle 37.5 overs?",
        answer:
          "Yes. 37.5 means 37 overs and 5 balls.",
      },
    ],
    relatedToolSlugs: ["run-rate-calculator", "target-run-rate-chase-planner"],
    relatedGuideSlugs: ["odi-run-rate-strategy-guide", "what-is-run-rate-in-cricket"],
    glossaryTerms: ["Run Rate", "Overs", "Balls"],
  },
  {
    name: "Follow-On Calculator",
    slug: "follow-on-calculator",
    metaTitle: "Follow-On Calculator",
    metaDescription:
      "Check whether a follow-on can be enforced using first-innings scores and common 5-day, 4-day, 3-day, or 2-day thresholds.",
    intro:
      "Check a multi-day cricket follow-on scenario using team scores and match length.",
    description: [
      "The follow-on can allow the team batting first to ask the opponent to bat again immediately if the lead is large enough.",
      "This calculator uses common lead thresholds and includes a reminder that playing conditions may vary.",
    ],
    formula: {
      title: "Follow-on check",
      value: "Lead = team batting first runs - team batting second runs",
      note: "Common thresholds: 5-day 200, 4-day 150, 3-day 150, 2-day 100.",
    },
    example: {
      title: "Example",
      steps: [
        "Team A scores 480 and Team B scores 260.",
        "The lead is 220 runs.",
        "In a 5-day match, the 200-run threshold is met, so the follow-on can usually be enforced.",
      ],
    },
    faqs: [
      {
        question: "Is the follow-on automatic?",
        answer:
          "No. The leading team chooses whether to enforce it when the conditions are met.",
      },
      {
        question: "Can playing conditions change the threshold?",
        answer:
          "Yes. Always check the competition rules for formal matches.",
      },
    ],
    relatedToolSlugs: ["run-rate-calculator", "target-run-rate-chase-planner"],
    relatedGuideSlugs: ["follow-on-rule-in-test-cricket", "cricket-overs-and-balls-explained"],
    glossaryTerms: ["Run Rate"],
  },
  {
    name: "Bowling Strike Rate Calculator",
    slug: "bowling-strike-rate-calculator",
    metaTitle: "Bowling Strike Rate Calculator",
    metaDescription:
      "Calculate bowling strike rate from balls bowled and wickets taken, with friendly zero-wicket handling.",
    intro:
      "Calculate how many balls a bowler takes per wicket using balls bowled and wickets taken.",
    description: [
      "Bowling strike rate is different from batting strike rate. It measures wicket-taking frequency.",
      "If wickets are zero, the calculator explains why normal division cannot produce a strike rate.",
    ],
    formula: {
      title: "Bowling strike rate formula",
      value: "Bowling strike rate = balls bowled / wickets taken",
      note: "Wickets must be greater than zero for normal division.",
    },
    example: {
      title: "Example",
      steps: [
        "A bowler delivers 60 balls and takes 3 wickets.",
        "60 divided by 3 equals 20.",
        "The bowling strike rate is 20 balls per wicket.",
      ],
    },
    faqs: [
      {
        question: "Is lower bowling strike rate better?",
        answer:
          "Usually yes, because it means wickets are taken more frequently.",
      },
      {
        question: "What happens with zero wickets?",
        answer:
          "The calculator shows a friendly message because division by zero is not possible.",
      },
    ],
    relatedToolSlugs: ["bowling-average-calculator", "economy-rate-calculator"],
    relatedGuideSlugs: ["bowling-economy-vs-bowling-average", "dot-ball-percentage-in-cricket-explained"],
    glossaryTerms: ["Balls", "Wickets", "Bowling Average"],
  },
  {
    name: "Partnership Run Rate Calculator",
    slug: "partnership-run-rate-calculator",
    metaTitle: "Partnership Run Rate Calculator",
    metaDescription:
      "Calculate cricket partnership run rate from partnership runs and overs using safe cricket over validation.",
    intro:
      "Measure how quickly a batting partnership scored by entering partnership runs and overs.",
    description: [
      "Partnership run rate can show whether two batters rebuilt steadily, accelerated, or changed the innings tempo.",
      "The calculator accepts cricket overs such as 8.4 and converts them safely for calculation.",
    ],
    formula: {
      title: "Partnership run rate formula",
      value: "Partnership run rate = partnership runs / partnership overs",
      note: "Use cricket notation for partial overs. 8.4 means 8 overs and 4 balls.",
    },
    example: {
      title: "Example",
      steps: [
        "A partnership adds 72 runs in 9 overs.",
        "72 divided by 9 equals 8.00.",
        "The partnership run rate is 8.00 runs per over.",
      ],
    },
    faqs: [
      {
        question: "Is partnership run rate the same formula as team run rate?",
        answer:
          "Yes, but it uses only the runs and overs for that partnership.",
      },
      {
        question: "Can I use partial overs?",
        answer:
          "Yes. Use cricket notation such as 6.3 for 6 overs and 3 balls.",
      },
    ],
    relatedToolSlugs: ["run-rate-calculator", "strike-rate-calculator"],
    relatedGuideSlugs: ["what-is-run-rate-in-cricket", "cricket-overs-and-balls-explained"],
    glossaryTerms: ["Run Rate", "Overs", "Balls"],
  },
  {
    name: "Balls to Overs Converter",
    slug: "balls-to-overs-converter",
    metaTitle: "Balls to Overs Converter",
    metaDescription:
      "Convert cricket balls to overs and overs back to balls with decimal overs output and validation for invalid over notation.",
    intro:
      "Convert legal balls into cricket overs, decimal overs, or reverse cricket overs back into balls.",
    description: [
      "Cricket over notation is not normal decimal notation, so conversions must treat six balls as one over.",
      "This utility is useful before using run rate, required run rate, economy rate, or NRR calculators.",
    ],
    formula: {
      title: "Conversion formulas",
      value: "Balls = overs x 6 + remaining balls; decimal overs = balls / 6",
      note: "In cricket notation, 4.3 means 4 overs and 3 balls.",
    },
    example: {
      title: "Example",
      steps: [
        "27 balls equals 4 complete overs and 3 balls.",
        "The cricket format is 4.3 overs.",
        "The decimal overs value is 4.50.",
      ],
    },
    faqs: [
      {
        question: "Why is 4.6 invalid?",
        answer:
          "Six balls complete the next over, so 4.6 should be written as 5.0.",
      },
      {
        question: "Can this convert overs back to balls?",
        answer:
          "Yes. Enter cricket overs such as 4.3 to see the balls output.",
      },
    ],
    relatedToolSlugs: ["run-rate-calculator", "economy-rate-calculator"],
    relatedGuideSlugs: ["how-to-convert-balls-to-overs-in-cricket", "cricket-overs-and-balls-explained"],
    glossaryTerms: ["Overs", "Balls"],
  },
  {
    name: "Points Table Calculator",
    slug: "points-table-calculator",
    metaTitle: "Points Table Calculator",
    metaDescription:
      "Create a manual cricket points table with team stats, editable points, automatic NRR, rankings, local save, and export options.",
    intro:
      "Build a local custom points table for school, club, friendly, or community cricket tournaments.",
    description: [
      "This manual points table creator lets you add teams, enter match stats, calculate net run rate, and sort standings without login or a database.",
      "It is designed for local tournaments and planning. No official league branding, live scores, fake teams, or external sports API data are used.",
    ],
    formula: {
      title: "Points table and NRR formulas",
      value:
        "Points = wins x 2 + no results x 1; NRR = runs scored / overs faced - runs conceded / overs bowled",
      note: "You can edit points manually. Rankings sort by points, NRR, wins, then team name alphabetically.",
    },
    example: {
      title: "Example",
      steps: [
        "Add Team A and Team B, then enter matches, wins, losses, no results, runs, and overs.",
        "The table calculates each team's NRR using cricket over notation such as 18.4 overs.",
        "Teams are ranked by points first, then NRR, wins, and alphabetical team name.",
      ],
    },
    faqs: [
      {
        question: "Is this connected to live standings?",
        answer:
          "No. It is a manual local points table creator for user-entered tournament data.",
      },
      {
        question: "Can I save my table?",
        answer:
          "Yes. The current table can be saved to localStorage on this device only.",
      },
      {
        question: "How is ranking calculated?",
        answer:
          "Teams are sorted by points descending, NRR descending, wins descending, then team name alphabetically.",
      },
    ],
    relatedToolSlugs: [
      "nrr-calculator",
      "tournament-qualification-scenario-predictor",
      "balls-to-overs-converter",
    ],
    relatedGuideSlugs: [
      "cricket-points-table-rules-explained",
      "how-cricket-tournament-qualification-works",
      "how-to-calculate-nrr-in-cricket",
    ],
    glossaryTerms: ["NRR", "Run Rate", "Overs", "Balls"],
  },
];

export function getCalculatorPageBySlug(slug: string) {
  return calculatorPages.find((calculator) => calculator.slug === slug);
}
