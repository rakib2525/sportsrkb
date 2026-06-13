export type GuideHubFaq = {
  question: string;
  answer: string;
};

export type GuideHub = {
  title: string;
  slug: string;
  href: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  intro: string;
  guideSlugs: string[];
  toolSlugs: string[];
  faqs: GuideHubFaq[];
};

export const guideHubs: GuideHub[] = [
  {
    title: "Net Run Rate Guides",
    slug: "net-run-rate",
    href: "/guides/net-run-rate",
    metaTitle: "Net Run Rate Guides and Calculators",
    metaDescription:
      "Learn net run rate, NRR mistakes, tournament qualification impact, and practical NRR examples with RKBSports.app guides and calculators.",
    excerpt:
      "Understand NRR formulas, examples, qualification pressure, and tournament table impact.",
    intro:
      "Net run rate can decide tournament positions when teams finish level on points. This hub collects beginner-friendly NRR guides, mistakes to avoid, and calculators for manual planning.",
    guideSlugs: [
      "how-to-calculate-nrr-in-cricket",
      "net-run-rate-calculation-examples",
      "common-net-run-rate-mistakes",
      "net-run-rate-vs-run-rate-difference",
      "why-net-run-rate-matters-in-tournaments",
      "how-net-run-rate-affects-qualification-scenarios",
      "how-to-improve-net-run-rate-in-a-tournament",
    ],
    toolSlugs: [
      "nrr-calculator",
      "t20-net-run-rate-calculator",
      "odi-net-run-rate-calculator",
      "points-table-calculator",
    ],
    faqs: [
      {
        question: "What should I read first to understand net run rate?",
        answer:
          "Start with the basic NRR calculation guide, then read the examples and common mistakes guides.",
      },
      {
        question: "Does NRR decide qualification before points?",
        answer:
          "Usually no. Points normally come first, and NRR matters when teams are tied under the tournament rules.",
      },
      {
        question: "Can these guides replace official tournament rules?",
        answer:
          "No. They explain the concepts and manual estimates, but official standings depend on the competition rules.",
      },
      {
        question: "Which calculator is best for a simple NRR estimate?",
        answer:
          "Use the NRR calculator for a simple manual estimate, or the points table calculator for a local tournament table.",
      },
    ],
  },
  {
    title: "Run Rate Guides",
    slug: "run-rate",
    href: "/guides/run-rate",
    metaTitle: "Run Rate and Required Run Rate Guides",
    metaDescription:
      "Explore run rate, required run rate, chase planning, target scores, and over conversion guides with related cricket calculators.",
    excerpt:
      "Learn current run rate, required run rate, chase equations, and balls-to-overs conversion.",
    intro:
      "Run rate explains scoring pace, while required run rate explains chase pressure. This hub brings together the guides and tools that help readers follow innings speed clearly.",
    guideSlugs: [
      "what-is-run-rate-in-cricket",
      "required-run-rate-explained",
      "required-run-rate-examples-for-beginners",
      "target-score-vs-required-run-rate-explained",
      "how-to-plan-a-run-chase-in-cricket",
      "how-to-calculate-team-run-rate-after-every-over",
      "t20-run-rate-strategy-guide",
      "odi-run-rate-strategy-guide",
      "balls-to-overs-conversion-examples",
    ],
    toolSlugs: [
      "run-rate-calculator",
      "required-run-rate-calculator",
      "target-run-rate-chase-planner",
      "balls-to-overs-converter",
    ],
    faqs: [
      {
        question: "What is the difference between run rate and required run rate?",
        answer:
          "Run rate shows current scoring speed. Required run rate shows the scoring speed needed from the current chase position.",
      },
      {
        question: "Why do overs need conversion?",
        answer:
          "Cricket overs are not normal decimals, so values such as 4.3 must be converted safely before division.",
      },
      {
        question: "Can run rate predict a final score?",
        answer:
          "It can guide a rough projection, but wickets, pitch, bowling, and match phase can change the outcome.",
      },
    ],
  },
  {
    title: "Tournament Planning Guides",
    slug: "tournament-planning",
    href: "/guides/tournament-planning",
    metaTitle: "Cricket Tournament Planning Guides",
    metaDescription:
      "Plan local cricket tournaments with guides for points tables, fixtures, qualification scenarios, tiebreakers, and format choices.",
    excerpt:
      "Organize points tables, fixtures, tiebreakers, qualification paths, and local cricket formats.",
    intro:
      "Tournament planning works best when fixtures, points, tiebreakers, and communication are clear before matches begin. These guides are built for manual, local, and friendly competitions.",
    guideSlugs: [
      "local-cricket-tournament-points-table-guide",
      "how-to-use-a-cricket-points-table-calculator",
      "cricket-match-planning-checklist-for-local-tournaments",
      "how-to-create-a-cricket-fixture-list",
      "cricket-knockout-vs-league-format-explained",
      "cricket-points-table-rules-explained",
      "cricket-tiebreaker-rules-explained",
      "how-cricket-tournament-qualification-works",
      "why-net-run-rate-matters-in-tournaments",
    ],
    toolSlugs: [
      "points-table-calculator",
      "tournament-qualification-scenario-predictor",
      "nrr-calculator",
    ],
    faqs: [
      {
        question: "Can these guides be used for school or club tournaments?",
        answer:
          "Yes. They focus on manual local tournament planning without official league branding or live data.",
      },
      {
        question: "What should organizers decide first?",
        answer:
          "Decide the format, points system, fixture list, no-result rule, and tiebreaker order before matches start.",
      },
      {
        question: "Do local tournaments need NRR?",
        answer:
          "NRR is useful for league tables, but only if scorers can record runs and overs accurately.",
      },
      {
        question: "Are scenario tools official predictions?",
        answer:
          "No. They are planning helpers based on manual inputs and should not replace official rules.",
      },
    ],
  },
  {
    title: "Bowling Stats Guides",
    slug: "bowling-stats",
    href: "/guides/bowling-stats",
    metaTitle: "Bowling Statistics Guides and Calculators",
    metaDescription:
      "Learn bowling economy, average, strike rate, dot balls, maidens, extras, and spell analysis with practical cricket examples.",
    excerpt:
      "Study economy rate, bowling average, bowling strike rate, dots, maidens, and spell analysis.",
    intro:
      "Bowling statistics show control, wicket threat, pressure, and discipline. This hub groups guides that explain the numbers behind a bowler's spell.",
    guideSlugs: [
      "what-is-a-good-economy-rate-in-t20-cricket",
      "economy-rate-benchmarks-by-format",
      "bowling-economy-vs-bowling-average",
      "how-to-calculate-bowling-average-with-examples",
      "bowling-strike-rate-explained-with-examples",
      "dot-ball-percentage-in-cricket-explained",
      "how-dot-balls-impact-a-match",
      "death-over-bowling-strategies",
      "how-to-analyze-a-bowlers-spell",
      "cricket-maiden-over-meaning-and-importance",
    ],
    toolSlugs: [
      "economy-rate-calculator",
      "bowling-average-calculator",
      "bowling-strike-rate-calculator",
      "bowlers-spell-analyzer",
    ],
    faqs: [
      {
        question: "Which bowling stat should beginners learn first?",
        answer:
          "Economy rate is a good starting point because it shows run control per over.",
      },
      {
        question: "Is bowling average the same as economy?",
        answer:
          "No. Bowling average is runs per wicket, while economy is runs per over.",
      },
      {
        question: "Why do dot balls matter?",
        answer:
          "Dot balls create pressure by using deliveries without adding runs to the batting side.",
      },
    ],
  },
  {
    title: "Batting Stats Guides",
    slug: "batting-stats",
    href: "/guides/batting-stats",
    metaTitle: "Batting Statistics Guides and Calculators",
    metaDescription:
      "Learn batting average, strike rate, partnership run rate, power hitting, and scorecard batting context with RKBSports.app.",
    excerpt:
      "Understand batting average, strike rate, partnerships, power hitting, and batting scorecard context.",
    intro:
      "Batting statistics explain both consistency and scoring speed. This hub helps readers connect individual batting numbers with innings context.",
    guideSlugs: [
      "batting-average-in-cricket-explained",
      "how-to-calculate-batting-average-with-examples",
      "strike-rate-in-cricket-explained",
      "cricket-power-hitting-vs-strike-rate-explained",
      "partnership-run-rate-explained",
      "how-to-read-a-cricket-scorecard",
    ],
    toolSlugs: [
      "batting-average-calculator",
      "strike-rate-calculator",
      "partnership-run-rate-calculator",
      "fantasy-cricket-points-calculator",
    ],
    faqs: [
      {
        question: "What is the difference between batting average and strike rate?",
        answer:
          "Average measures runs per dismissal, while strike rate measures runs per 100 balls.",
      },
      {
        question: "Do not-out innings affect batting average?",
        answer:
          "Yes. Not-out runs count, but the innings does not add a dismissal.",
      },
      {
        question: "Is power hitting the same as strike rate?",
        answer:
          "No. Power hitting describes boundary ability, while strike rate measures total scoring speed.",
      },
    ],
  },
  {
    title: "Cricket Rules Guides",
    slug: "cricket-rules",
    href: "/guides/cricket-rules",
    metaTitle: "Cricket Rules Guides for Beginners",
    metaDescription:
      "Read beginner-friendly cricket rules guides covering overs, free hits, powerplays, follow-on, super overs, rain interruptions, and extras.",
    excerpt:
      "Learn cricket rules and formats with practical examples for beginners and local scorers.",
    intro:
      "Cricket rules can feel dense at first. This hub collects simple explanations of common rules that affect scorecards, calculators, and match planning.",
    guideSlugs: [
      "cricket-overs-and-balls-explained",
      "how-to-convert-balls-to-overs-in-cricket",
      "free-hit-rules-in-cricket",
      "powerplay-rules-in-t20-and-odi",
      "follow-on-rule-in-test-cricket",
      "cricket-follow-on-rule-with-examples",
      "super-over-rules-and-strategy",
      "understanding-rain-affected-matches",
      "cricket-extras-wide-no-ball-bye-leg-bye-explained",
    ],
    toolSlugs: [
      "balls-to-overs-converter",
      "follow-on-calculator",
      "super-over-target-calculator",
    ],
    faqs: [
      {
        question: "Are these official laws of cricket pages?",
        answer:
          "No. They are beginner-friendly explanations and should be checked against official playing conditions for formal matches.",
      },
      {
        question: "Why are overs included in rules guides?",
        answer:
          "Over notation affects scorekeeping, run rate, economy rate, and NRR calculations.",
      },
      {
        question: "Can local tournaments simplify rules?",
        answer:
          "Yes, but simplified rules should be written down and shared before play begins.",
      },
    ],
  },
  {
    title: "Fantasy Cricket Guides",
    slug: "fantasy-cricket",
    href: "/guides/fantasy-cricket",
    metaTitle: "Generic Fantasy Cricket Guides and Calculator",
    metaDescription:
      "Learn generic fantasy cricket points concepts, batting and bowling stats, and safe non-branded fantasy scoring examples.",
    excerpt:
      "Explore generic fantasy cricket points concepts without platform branding or copied rules.",
    intro:
      "Fantasy cricket scoring systems can vary by platform or local contest. RKBSports.app keeps this topic generic, educational, and clear about rule differences.",
    guideSlugs: [
      "fantasy-cricket-points-explained-generic-guide",
      "strike-rate-in-cricket-explained",
      "cricket-power-hitting-vs-strike-rate-explained",
      "what-is-a-good-economy-rate-in-t20-cricket",
      "cricket-maiden-over-meaning-and-importance",
      "how-to-read-a-cricket-scorecard",
    ],
    toolSlugs: [
      "fantasy-cricket-points-calculator",
      "strike-rate-calculator",
      "economy-rate-calculator",
      "bowlers-spell-analyzer",
    ],
    faqs: [
      {
        question: "Does RKBSports.app copy any fantasy platform rules?",
        answer:
          "No. The fantasy content uses generic educational scoring examples only.",
      },
      {
        question: "Will actual fantasy scoring differ?",
        answer:
          "Yes. Always check the rules of the contest or platform you are using.",
      },
      {
        question: "Which stats matter most for generic fantasy cricket?",
        answer:
          "Runs, wickets, catches, boundaries, maidens, economy, and strike rate can all matter depending on the rules.",
      },
    ],
  },
  {
    title: "Local Cricket Guides",
    slug: "local-cricket",
    href: "/guides/local-cricket",
    metaTitle: "Local Cricket Tournament and Scoring Guides",
    metaDescription:
      "Guides for local cricket organizers covering fixtures, points tables, scorecards, match planning, saved tools, and tournament rules.",
    excerpt:
      "Plan local cricket matches, scorecards, fixture lists, points tables, and fair tournament rules.",
    intro:
      "Local cricket needs practical tools more than complicated systems. This hub focuses on manual planning, scoring, communication, and fair tournament management.",
    guideSlugs: [
      "cricket-match-planning-checklist-for-local-tournaments",
      "local-cricket-tournament-points-table-guide",
      "how-to-create-a-cricket-fixture-list",
      "how-to-use-a-cricket-points-table-calculator",
      "how-to-read-a-cricket-scorecard",
      "beginner-guide-to-cricket-statistics",
      "cricket-knockout-vs-league-format-explained",
    ],
    toolSlugs: [
      "points-table-calculator",
      "run-rate-calculator",
      "nrr-calculator",
      "dashboard",
    ],
    faqs: [
      {
        question: "Are these guides for official leagues?",
        answer:
          "No. They are written for local, school, club, friendly, and community cricket planning.",
      },
      {
        question: "Can I use these tools without login?",
        answer:
          "Yes. RKBSports.app tools use manual inputs and local browser storage where saving is needed.",
      },
      {
        question: "What is the best local tournament starting point?",
        answer:
          "Start with the match planning checklist, then create fixtures and a points table rule.",
      },
      {
        question: "Do local guides use fake teams or live data?",
        answer:
          "No. They avoid fake data and are meant for your own manual tournament information.",
      },
    ],
  },
];

export function getGuideHubBySlug(slug: string) {
  return guideHubs.find((hub) => hub.slug === slug);
}

export function getGuideHubForGuideSlug(guideSlug: string) {
  return guideHubs.find((hub) => hub.guideSlugs.includes(guideSlug));
}
