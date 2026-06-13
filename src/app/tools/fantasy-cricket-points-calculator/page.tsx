import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { FantasyCricketPointsCalculator } from "@/components/calculator/CricketCalculators";
import { getCalculatorPageBySlug } from "@/data/calculators";
import { createCalculatorMetadata } from "@/lib/seo/calculatorMetadata";

const calculator = getCalculatorPageBySlug("fantasy-cricket-points-calculator");

export const metadata = createCalculatorMetadata("fantasy-cricket-points-calculator");

export default function FantasyCricketPointsCalculatorPage() {
  if (!calculator) {
    return null;
  }

  return (
    <CalculatorLayout
      calculator={calculator}
      calculatorPanel={<FantasyCricketPointsCalculator />}
    />
  );
}
