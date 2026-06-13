import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { SuperOverTargetCalculator } from "@/components/calculator/CricketCalculators";
import { getCalculatorPageBySlug } from "@/data/calculators";
import { createCalculatorMetadata } from "@/lib/seo/calculatorMetadata";

const calculator = getCalculatorPageBySlug("super-over-target-calculator");

export const metadata = createCalculatorMetadata("super-over-target-calculator");

export default function SuperOverTargetCalculatorPage() {
  if (!calculator) {
    return null;
  }

  return (
    <CalculatorLayout
      calculator={calculator}
      calculatorPanel={<SuperOverTargetCalculator />}
    />
  );
}
