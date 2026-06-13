import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { TargetRunRateChasePlanner } from "@/components/calculator/CricketCalculators";
import { getCalculatorPageBySlug } from "@/data/calculators";
import { createCalculatorMetadata } from "@/lib/seo/calculatorMetadata";

const calculator = getCalculatorPageBySlug("target-run-rate-chase-planner");

export const metadata = createCalculatorMetadata("target-run-rate-chase-planner");

export default function TargetRunRateChasePlannerPage() {
  if (!calculator) {
    return null;
  }

  return (
    <CalculatorLayout
      calculator={calculator}
      calculatorPanel={<TargetRunRateChasePlanner />}
    />
  );
}
