import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { RunRateCalculator } from "@/components/calculator/CricketCalculators";
import { getCalculatorPageBySlug } from "@/data/calculators";
import { createCalculatorMetadata } from "@/lib/seo/calculatorMetadata";

const calculator = getCalculatorPageBySlug("odi-run-rate-calculator");

export const metadata = createCalculatorMetadata("odi-run-rate-calculator");

export default function OdiRunRateCalculatorPage() {
  if (!calculator) return null;

  return (
    <CalculatorLayout
      calculator={calculator}
      calculatorPanel={
        <RunRateCalculator
          storageKey="rkbsports:odi-run-rate-recent"
          title="ODI run rate calculator"
          resultLabel="ODI Run Rate"
          defaultOvers="50"
          contextNote="A full ODI innings is usually 50 overs, so small rate changes can add up over time."
        />
      }
    />
  );
}
