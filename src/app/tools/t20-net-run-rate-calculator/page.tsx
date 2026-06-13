import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { NrrCalculator } from "@/components/calculator/CricketCalculators";
import { getCalculatorPageBySlug } from "@/data/calculators";
import { createCalculatorMetadata } from "@/lib/seo/calculatorMetadata";

const calculator = getCalculatorPageBySlug("t20-net-run-rate-calculator");

export const metadata = createCalculatorMetadata("t20-net-run-rate-calculator");

export default function T20NetRunRateCalculatorPage() {
  if (!calculator) return null;

  return (
    <CalculatorLayout
      calculator={calculator}
      calculatorPanel={
        <NrrCalculator
          storageKey="rkbsports:t20-nrr-recent"
          title="T20 net run rate calculator"
          calculatorName="T20 Net Run Rate Calculator"
          defaultOvers="20"
          contextNote="This T20 variation uses 20-over context for full innings."
        />
      }
    />
  );
}
