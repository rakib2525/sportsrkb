import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { FollowOnCalculator } from "@/components/calculator/CricketCalculators";
import { getCalculatorPageBySlug } from "@/data/calculators";
import { createCalculatorMetadata } from "@/lib/seo/calculatorMetadata";

const calculator = getCalculatorPageBySlug("follow-on-calculator");

export const metadata = createCalculatorMetadata("follow-on-calculator");

export default function FollowOnCalculatorPage() {
  if (!calculator) return null;

  return (
    <CalculatorLayout
      calculator={calculator}
      calculatorPanel={<FollowOnCalculator />}
    />
  );
}
