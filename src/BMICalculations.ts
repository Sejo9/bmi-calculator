import { Units } from "./Units";

const calculateBMI = (weight: number, height: number, unit: Units): number => {
  let result: number;

  if (unit === Units.METRIC) {
    result = weight / Math.pow(height / 100, 2);
  } else {
    result = (weight / Math.pow(height, 2)) * 703;
  }

  return Number(result.toFixed(1));
};

const categorizeBMI = (BMI: number): string => {
  if (BMI < 18.5) {
    return "underweight";
  } else if (BMI >= 18.5 && BMI <= 24.9) {
    return "a healthy weight";
  } else if (BMI >= 25.0 && BMI <= 29.9) {
    return "overweight";
  } else {
    return "obese";
  }
};

const calculateIdealWeightRange = (height: number, unit: Units): string => {
  let minWeight: number;
  let maxWeight: number;

  if (unit === Units.METRIC) {
    minWeight = 18.5 * Math.pow(height / 100, 2);
    maxWeight = 24.9 * Math.pow(height / 100, 2);

    return `${minWeight.toFixed(1)}kgs - ${maxWeight.toFixed(1)}kgs`;
  } else {
    minWeight = (18.5 / 703) * Math.pow(height, 2);
    maxWeight = (24.9 / 703) * Math.pow(height, 2);

    const minStone = Math.trunc(minWeight / 14);
    const minPounds = Math.trunc(minWeight % 14);

    const maxStone = Math.trunc(maxWeight / 14);
    const maxPounds = Math.trunc(maxWeight % 14);

    return `${minStone}st ${minPounds}lbs - ${maxStone}st ${maxPounds}lbs`;
  }
};

export { calculateBMI, categorizeBMI, calculateIdealWeightRange };
