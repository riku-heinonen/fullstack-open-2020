import { ExerciseInput, calculateExercises } from './exerciseCalculator';

const parseExerciseArguments = (args: string[]): ExerciseInput => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (isNaN(Number(args[2]))) {
    throw new Error('Target exercise hours must be a number');
  }
  const targetHours = Number(args[2]);
  const dailyHours = args.slice(3).map(Number);
  dailyHours.forEach((hours) => {
    if (isNaN(hours)) throw new Error('Daily exercise hours must be numbers');
  });

  return {
    targetHours,
    dailyHours,
  };
};

try {
  const { targetHours, dailyHours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyHours, targetHours));
} catch (e) {
  if (e instanceof Error) {
    console.log('Something went wrong: ', e.message);
  }
}
