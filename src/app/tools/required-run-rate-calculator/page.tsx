import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { RequiredRunRateCalculator } from "@/components/calculator/CricketCalculators";
import { getCalculatorPageBySlug } from "@/data/calculators";
import { createCalculatorMetadata } from "@/lib/seo/calculatorMetadata";

const calculator = getCalculatorPageBySlug("required-run-rate-calculator");

export const metadata = createCalculatorMetadata("required-run-rate-calculator");

export default function RequiredRunRateCalculatorPage() {
  if (!calculator) {
    return null;
  }

  return (
    <CalculatorLayout
      calculator={calculator}
      calculatorPanel={<RequiredRunRateCalculator />}
    />
  );
}
