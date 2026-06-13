import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { PartnershipRunRateCalculator } from "@/components/calculator/CricketCalculators";
import { getCalculatorPageBySlug } from "@/data/calculators";
import { createCalculatorMetadata } from "@/lib/seo/calculatorMetadata";

const calculator = getCalculatorPageBySlug("partnership-run-rate-calculator");

export const metadata = createCalculatorMetadata("partnership-run-rate-calculator");

export default function PartnershipRunRateCalculatorPage() {
  if (!calculator) return null;

  return (
    <CalculatorLayout
      calculator={calculator}
      calculatorPanel={<PartnershipRunRateCalculator />}
    />
  );
}
