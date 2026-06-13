import { BowlersSpellAnalyzer } from "@/components/calculator/CricketCalculators";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { getCalculatorPageBySlug } from "@/data/calculators";
import { createCalculatorMetadata } from "@/lib/seo/calculatorMetadata";

const calculator = getCalculatorPageBySlug("bowlers-spell-analyzer");

export const metadata = createCalculatorMetadata("bowlers-spell-analyzer");

export default function BowlersSpellAnalyzerPage() {
  if (!calculator) {
    return null;
  }

  return (
    <CalculatorLayout
      calculator={calculator}
      calculatorPanel={<BowlersSpellAnalyzer />}
    />
  );
}
