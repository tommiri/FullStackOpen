interface ArgValues {
  value1: number;
  value2: number;
}

type BmiDetails = 'Underweight' | 'Normal range' | 'Overweight' | 'Obese';

const parseBmiArguments = (args: string[]): ArgValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): BmiDetails => {
  const heightSquared = Math.pow(height / 100, 2);
  const bmi = weight / heightSquared;

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal range';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

if (import.meta.url.startsWith('file:')) {
  const modulePath = new URL(import.meta.url).pathname;
  if (process.argv[1] === modulePath) {
    try {
      const { value1, value2 } = parseBmiArguments(process.argv);
      console.log(calculateBmi(value1, value2));
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      console.error(errorMessage);
    }
  }
}
