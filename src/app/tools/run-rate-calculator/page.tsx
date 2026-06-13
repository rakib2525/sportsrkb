import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { RunRateCalculator } from "@/components/calculator/CricketCalculators";
import { getCalculatorPageBySlug } from "@/data/calculators";
import { createCalculatorMetadata } from "@/lib/seo/calculatorMetadata";

const calculator = getCalculatorPageBySlug("run-rate-calculator");

export const metadata = createCalculatorMetadata("run-rate-calculator");

export default function RunRateCalculatorPage() {
  if (!calculator) {
    return null;
  }

  return (
    <CalculatorLayout
      calculator={calculator}
      calculatorPanel={<RunRateCalculator />}
    />
  );
}
