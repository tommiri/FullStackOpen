interface ExerciseArgs {
  dailyHours: number[];
  dailyTarget: number;
}

const parseExerciseArgs = (args: string[]): ExerciseArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const values = args.slice(2).map((n) => Number(n));

  const isInvalid = values.includes(NaN);

  if (isInvalid) {
    throw new Error('Provided values were not numbers!');
  }

  const [dailyTarget, ...dailyHours] = values as [number, ...number[]];

  return {
    dailyTarget,
    dailyHours,
  };
};

interface ExerciseDetails {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyTarget: number,
  dailyHours: number[]
): ExerciseDetails => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((n) => n > 0).length;
  const dailyAverage =
    dailyHours.reduce((prev, curr) => prev + curr) / periodLength;
  const success = dailyAverage >= dailyTarget;
  let rating = dailyAverage / dailyTarget;
  let ratingDescription: string;

  if (rating >= 1) {
    rating = 3;
    ratingDescription = 'Great work, keep it up!';
  } else if (rating >= 0.5) {
    rating = 2;
    ratingDescription = 'Not bad, but you could do better!';
  } else {
    rating = 1;
    ratingDescription = 'You need to do better!';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: dailyTarget,
    average: dailyAverage,
  };
};

if (import.meta.url.startsWith('file:')) {
  const modulePath = new URL(import.meta.url).pathname;
  if (process.argv[1] === modulePath) {
    try {
      const { dailyTarget, dailyHours } = parseExerciseArgs(process.argv);
      console.log(calculateExercises(dailyTarget, dailyHours));
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      console.error(errorMessage);
    }
  }
}
