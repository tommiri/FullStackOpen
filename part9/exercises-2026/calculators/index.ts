import express from 'express';
import { calculateBmi } from './src/bmiCalculator.js';
import { calculateExercises } from './src/exerciseCalculator.js';
import { isNonEmptyNumArray } from './src/utils.js';

const app = express();

app.use(express.json());

app.get('/hello', (req, res) => {
  console.log(req.query);
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query?.weight);
  const height = Number(req.query?.height);

  const invalidWeight = !weight || isNaN(weight);
  const invalidHeight = !height || isNaN(height);

  if (invalidWeight || invalidHeight) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(height, weight);

  return res.status(200).json({
    weight: weight,
    height: height,
    bmi,
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || target === undefined || target === null) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  const isNumArray = isNonEmptyNumArray(daily_exercises);
  const isNumber = typeof target === 'number';

  if (!isNumArray || !isNumber) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const exerciseData = calculateExercises(target, daily_exercises);

  return res.status(200).json(exerciseData);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
