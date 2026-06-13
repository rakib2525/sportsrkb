import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { NrrCalculator } from "@/components/calculator/CricketCalculators";
import { getCalculatorPageBySlug } from "@/data/calculators";
import { createCalculatorMetadata } from "@/lib/seo/calculatorMetadata";

const calculator = getCalculatorPageBySlug("nrr-calculator");

export const metadata = createCalculatorMetadata("nrr-calculator");

export default function NrrCalculatorPage() {
  if (!calculator) {
    return null;
  }

  return (
    <CalculatorLayout
      calculator={calculator}
      calculatorPanel={<NrrCalculator />}
    />
  );
}
