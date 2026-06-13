import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { BowlingStrikeRateCalculator } from "@/components/calculator/CricketCalculators";
import { getCalculatorPageBySlug } from "@/data/calculators";
import { createCalculatorMetadata } from "@/lib/seo/calculatorMetadata";

const calculator = getCalculatorPageBySlug("bowling-strike-rate-calculator");

export const metadata = createCalculatorMetadata("bowling-strike-rate-calculator");

export default function BowlingStrikeRateCalculatorPage() {
  if (!calculator) return null;

  return (
    <CalculatorLayout
      calculator={calculator}
      calculatorPanel={<BowlingStrikeRateCalculator />}
    />
  );
}
