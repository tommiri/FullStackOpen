type BmiCategory =
  | 'Underweight'
  | 'Normal (healthy weight)'
  | 'Overweight'
  | 'Obese';

export const calculateBmi = (
  height: number,
  weight: number
): BmiCategory => {
  if (height <= 0 || weight <= 0) {
    throw new Error(
      `${height <= 0 ? 'Height' : 'Weight'} must be a positive value!`
    );
  }

  const bmi: number = weight / (height / 100) ** 2;

  if (bmi < 18.5) return 'Underweight';
  else if (bmi < 25) return 'Normal (healthy weight)';
  else if (bmi < 30) return 'Overweight';
  else return 'Obese';
};
