import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { NrrCalculator } from "@/components/calculator/CricketCalculators";
import { getCalculatorPageBySlug } from "@/data/calculators";
import { createCalculatorMetadata } from "@/lib/seo/calculatorMetadata";

const calculator = getCalculatorPageBySlug("odi-net-run-rate-calculator");

export const metadata = createCalculatorMetadata("odi-net-run-rate-calculator");

export default function OdiNetRunRateCalculatorPage() {
  if (!calculator) return null;

  return (
    <CalculatorLayout
      calculator={calculator}
      calculatorPanel={
        <NrrCalculator
          storageKey="rkbsports:odi-nrr-recent"
          title="ODI net run rate calculator"
          calculatorName="ODI Net Run Rate Calculator"
          defaultOvers="50"
          contextNote="This ODI variation uses 50-over context for full innings."
        />
      }
    />
  );
}
