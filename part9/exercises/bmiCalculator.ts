import { parseNumArguments } from './utils/parseArguments';

type BmiCategory = 'Underweight' | 'Normal' | 'Overweight' | 'Obese';

const calculateBmi = (
  height: number,
  weight: number
): BmiCategory => {
  if (height <= 0) {
    throw new Error('Height must be a positive value!');
  }

  const bmi: number = weight / (height / 100) ** 2;

  if (bmi < 18.5) return 'Underweight';
  else if (bmi < 25) return 'Normal';
  else if (bmi < 30) return 'Overweight';
  else return 'Obese';
};

try {
  const [height, weight] = parseNumArguments(process.argv, 2, 2);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
