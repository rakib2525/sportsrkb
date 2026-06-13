export type CricketOversValidation = {
  isValid: boolean;
  error?: string;
};

const invalidOversMessage =
  "Overs cannot end with .6 or higher. Use cricket format like 4.3 for 4 overs and 3 balls.";

export function validateCricketOvers(value: string | number): CricketOversValidation {
  const rawValue = String(value).trim();

  if (!rawValue) {
    return { isValid: false, error: "Overs are required." };
  }

  if (!/^\d+(\.\d+)?$/.test(rawValue)) {
    return {
      isValid: false,
      error: "Overs must be a number in cricket format, such as 4.3.",
    };
  }

  const [oversPart, ballsPart = "0"] = rawValue.split(".");
  const overs = Number(oversPart);
  const balls = Number(ballsPart);

  if (!Number.isFinite(overs) || !Number.isFinite(balls)) {
    return { isValid: false, error: "Overs must be a valid number." };
  }

  if (overs < 0 || balls < 0) {
    return { isValid: false, error: "Overs cannot be negative." };
  }

  if (ballsPart.length > 1) {
    return {
      isValid: false,
      error: "Use cricket over format with one ball digit, such as 12.4.",
    };
  }

  if (balls >= 6) {
    return { isValid: false, error: invalidOversMessage };
  }

  return { isValid: true };
}

export function cricketOversToBalls(value: string | number): number {
  const validation = validateCricketOvers(value);

  if (!validation.isValid) {
    throw new Error(validation.error);
  }

  const [oversPart, ballsPart = "0"] = String(value).trim().split(".");
  return Number(oversPart) * 6 + Number(ballsPart);
}

export function ballsToCricketOvers(balls: number): string {
  if (!Number.isFinite(balls) || !Number.isInteger(balls)) {
    throw new Error("Balls must be a whole number.");
  }

  if (balls < 0) {
    throw new Error("Balls cannot be negative.");
  }

  const completeOvers = Math.floor(balls / 6);
  const remainingBalls = balls % 6;

  return remainingBalls === 0
    ? String(completeOvers)
    : `${completeOvers}.${remainingBalls}`;
}

export function cricketOversToDecimalOvers(value: string | number): number {
  const balls = cricketOversToBalls(value);
  return balls / 6;
}
