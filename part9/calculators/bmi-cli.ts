import { HeightAndWeight, calculateBmi } from './bmiCalculator';

const parseBmiArguments = (args: string[]): HeightAndWeight => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (isNaN(Number(args[2]))) {
    throw new Error('Height must be a number');
  }
  if (isNaN(Number(args[3]))) {
    throw new Error('Weight must be a number');
  }

  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  };
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  if (e instanceof Error) {
    console.log('Something went wrong: ', e.message);
  }
}
