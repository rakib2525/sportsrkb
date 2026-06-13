import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { BallsToOversConverter } from "@/components/calculator/CricketCalculators";
import { getCalculatorPageBySlug } from "@/data/calculators";
import { createCalculatorMetadata } from "@/lib/seo/calculatorMetadata";

const calculator = getCalculatorPageBySlug("balls-to-overs-converter");

export const metadata = createCalculatorMetadata("balls-to-overs-converter");

export default function BallsToOversConverterPage() {
  if (!calculator) return null;

  return (
    <CalculatorLayout
      calculator={calculator}
      calculatorPanel={<BallsToOversConverter />}
    />
  );
}
