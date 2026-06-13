import { BowlingAverageCalculator } from "@/components/calculator/CricketCalculators";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { getCalculatorPageBySlug } from "@/data/calculators";
import { createCalculatorMetadata } from "@/lib/seo/calculatorMetadata";

const calculator = getCalculatorPageBySlug("bowling-average-calculator");

export const metadata = createCalculatorMetadata("bowling-average-calculator");

export default function BowlingAverageCalculatorPage() {
  if (!calculator) {
    return null;
  }

  return (
    <CalculatorLayout
      calculator={calculator}
      calculatorPanel={<BowlingAverageCalculator />}
    />
  );
}
