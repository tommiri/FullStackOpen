import express from 'express';

import { parseNumArguments } from './utils/parseArguments';
import { calculateBmi } from './utils/calculateBmi';
import { calculateExercises } from './utils/calculateExercises';
import { isNonEmptyNumArray } from './utils/isNonEmptyNumArray';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  let { weight, height } = req.query;
  weight = weight?.toString() || undefined;
  height = height?.toString() || undefined;

  if (weight && height) {
    try {
      const [parsedHeight, parsedWeight] = parseNumArguments(
        [height, weight],
        2,
        2
      );
      return res.json({
        weight,
        height,
        bmi: calculateBmi(parsedHeight, parsedWeight),
      });
    } catch (error) {
      let errorMessage = 'Something unexpected happened.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      return res.status(400).json({ error: errorMessage });
    }
  } else {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
      return res.status(400).json({ error: 'parameters missing' });
    }

    if (isNonEmptyNumArray(daily_exercises) && Number(target)) {
      return res.json(
        calculateExercises(daily_exercises, Number(target))
      );
    } else {
      return res
        .status(400)
        .json({ error: 'malformatted parameters' });
    }
  } catch (error) {
    let errorMessage = 'Something unexpected happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return res.status(400).json({ error: errorMessage });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
