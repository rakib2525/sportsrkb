import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { StrikeRateCalculator } from "@/components/calculator/CricketCalculators";
import { getCalculatorPageBySlug } from "@/data/calculators";
import { createCalculatorMetadata } from "@/lib/seo/calculatorMetadata";

const calculator = getCalculatorPageBySlug("strike-rate-calculator");

export const metadata = createCalculatorMetadata("strike-rate-calculator");

export default function StrikeRateCalculatorPage() {
  if (!calculator) {
    return null;
  }

  return (
    <CalculatorLayout
      calculator={calculator}
      calculatorPanel={<StrikeRateCalculator />}
    />
  );
}
