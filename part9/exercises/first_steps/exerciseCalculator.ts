import { parseNumArguments } from './utils/parseArguments';
import { calculateExercises } from './utils/calculateExercises';

try {
  const [target, ...hours] = parseNumArguments(process.argv, 2);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
