import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { EconomyRateCalculator } from "@/components/calculator/CricketCalculators";
import { getCalculatorPageBySlug } from "@/data/calculators";
import { createCalculatorMetadata } from "@/lib/seo/calculatorMetadata";

const calculator = getCalculatorPageBySlug("economy-rate-calculator");

export const metadata = createCalculatorMetadata("economy-rate-calculator");

export default function EconomyRateCalculatorPage() {
  if (!calculator) {
    return null;
  }

  return (
    <CalculatorLayout
      calculator={calculator}
      calculatorPanel={<EconomyRateCalculator />}
    />
  );
}
