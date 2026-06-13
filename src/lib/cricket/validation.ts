import { validateCricketOvers } from "@/lib/cricket/overs";

export type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

export type NumericValidationOptions = {
  label: string;
  required?: boolean;
  allowZero?: boolean;
  allowNegative?: boolean;
};

export function validateNumericInput(
  value: string | number | null | undefined,
  options: NumericValidationOptions,
): ValidationResult {
  const rawValue = String(value ?? "").trim();

  if (!rawValue) {
    return {
      isValid: !options.required,
      errors: options.required ? [`${options.label} is required.`] : [],
    };
  }

  const numberValue = Number(rawValue);

  if (!Number.isFinite(numberValue)) {
    return {
      isValid: false,
      errors: [`${options.label} must be a valid number.`],
    };
  }

  if (!options.allowNegative && numberValue < 0) {
    return {
      isValid: false,
      errors: [`${options.label} cannot be negative.`],
    };
  }

  if (!options.allowZero && numberValue === 0) {
    return {
      isValid: false,
      errors: [`${options.label} must be greater than zero.`],
    };
  }

  return { isValid: true, errors: [] };
}

export function validateOversInput(
  value: string | number | null | undefined,
  label = "Overs",
): ValidationResult {
  const rawValue = String(value ?? "").trim();

  if (!rawValue) {
    return { isValid: false, errors: [`${label} are required.`] };
  }

  const validation = validateCricketOvers(rawValue);

  if (!validation.isValid) {
    return { isValid: false, errors: [validation.error ?? `${label} are invalid.`] };
  }

  const numberValue = Number(rawValue);

  if (numberValue === 0) {
    return {
      isValid: false,
      errors: [`${label} must be greater than zero to avoid division by zero.`],
    };
  }

  return { isValid: true, errors: [] };
}

export function validateDivisionInputs(
  numerator: string | number | null | undefined,
  denominator: string | number | null | undefined,
  numeratorLabel: string,
  denominatorLabel: string,
): ValidationResult {
  const numeratorResult = validateNumericInput(numerator, {
    label: numeratorLabel,
    required: true,
    allowZero: true,
  });
  const denominatorResult = validateNumericInput(denominator, {
    label: denominatorLabel,
    required: true,
  });
  const errors = [...numeratorResult.errors, ...denominatorResult.errors];

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function combineValidationResults(
  ...results: ValidationResult[]
): ValidationResult {
  const errors = results.flatMap((result) => result.errors);

  return {
    isValid: errors.length === 0,
    errors,
  };
}
