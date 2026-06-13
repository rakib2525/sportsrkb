import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { RunRateCalculator } from "@/components/calculator/CricketCalculators";
import { getCalculatorPageBySlug } from "@/data/calculators";
import { createCalculatorMetadata } from "@/lib/seo/calculatorMetadata";

const calculator = getCalculatorPageBySlug("t20-run-rate-calculator");

export const metadata = createCalculatorMetadata("t20-run-rate-calculator");

export default function T20RunRateCalculatorPage() {
  if (!calculator) return null;

  return (
    <CalculatorLayout
      calculator={calculator}
      calculatorPanel={
        <RunRateCalculator
          storageKey="rkbsports:t20-run-rate-recent"
          title="T20 run rate calculator"
          resultLabel="T20 Run Rate"
          defaultOvers="20"
          contextNote="A full T20 innings is usually 20 overs, but reduced matches can use fewer overs."
        />
      }
    />
  );
}
