import { parseNumArguments } from './utils/parseArguments';
import { calculateBmi } from './utils/calculateBmi';

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
