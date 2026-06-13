import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { PointsTableCalculator } from "@/components/calculator/PointsTableCalculator";
import { getCalculatorPageBySlug } from "@/data/calculators";
import { createCalculatorMetadata } from "@/lib/seo/calculatorMetadata";

const calculator = getCalculatorPageBySlug("points-table-calculator");

export const metadata = createCalculatorMetadata("points-table-calculator");

export default function PointsTableCalculatorPage() {
  if (!calculator) return null;

  return (
    <CalculatorLayout
      calculator={calculator}
      calculatorPanel={<PointsTableCalculator />}
    />
  );
}
