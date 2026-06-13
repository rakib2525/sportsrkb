import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { TournamentQualificationScenarioPredictor } from "@/components/calculator/CricketCalculators";
import { getCalculatorPageBySlug } from "@/data/calculators";
import { createCalculatorMetadata } from "@/lib/seo/calculatorMetadata";

const calculator = getCalculatorPageBySlug("tournament-qualification-scenario-predictor");

export const metadata = createCalculatorMetadata(
  "tournament-qualification-scenario-predictor",
);

export default function TournamentQualificationScenarioPredictorPage() {
  if (!calculator) {
    return null;
  }

  return (
    <CalculatorLayout
      calculator={calculator}
      calculatorPanel={<TournamentQualificationScenarioPredictor />}
    />
  );
}
