import { BattingAverageCalculator } from "@/components/calculator/CricketCalculators";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { getCalculatorPageBySlug } from "@/data/calculators";
import { createCalculatorMetadata } from "@/lib/seo/calculatorMetadata";

const calculator = getCalculatorPageBySlug("batting-average-calculator");

export const metadata = createCalculatorMetadata("batting-average-calculator");

export default function BattingAverageCalculatorPage() {
  if (!calculator) {
    return null;
  }

  return (
    <CalculatorLayout
      calculator={calculator}
      calculatorPanel={<BattingAverageCalculator />}
    />
  );
}
