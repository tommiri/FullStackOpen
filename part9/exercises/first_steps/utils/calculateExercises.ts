interface ExerciseSummary {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  exerciseHours: number[],
  target: number
): ExerciseSummary => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((num) => num > 0);
  const trainingHours = trainingDays.reduce(
    (sum, val) => sum + val,
    0
  );
  const average = periodLength > 0 ? trainingHours / periodLength : 0;
  const success = average >= target;

  let rating;
  if (success) rating = 3;
  else if (average >= target / 2) rating = 2;
  else rating = 1;

  let ratingDescription;
  switch (rating) {
    case 1:
      ratingDescription = 'Needs improvement!';
      break;
    case 2:
      ratingDescription = 'Not too bad, but could be better!';
      break;
    case 3:
      ratingDescription = 'Perfect!';
      break;
    default:
      throw new Error('Rating must be 1, 2 or 3!');
  }
  return {
    periodLength: periodLength,
    trainingDays: trainingDays.length,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};
