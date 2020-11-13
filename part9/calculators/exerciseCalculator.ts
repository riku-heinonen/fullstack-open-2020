export interface ExerciseInput {
  targetHours: number;
  dailyHours: number[];
}

export interface ExerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyHours: number[],
  targetHours: number
): ExerciseResults => {
  const ratingDescriptions = [
    'plain awful...',
    'not too bad but could be better',
    'target achieved, great work!',
  ];
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((amount) => amount != 0).length;
  const totalHours = dailyHours.reduce((acc, val) => acc + val, 0);
  const averageHours = totalHours / periodLength;
  const rating = Math.max(
    Math.min(Math.floor(3 * (averageHours / targetHours)), 3),
    1
  );
  const ratingDescription = ratingDescriptions[rating - 1];
  const success = averageHours >= targetHours;
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetHours,
    average: averageHours,
  };
};
