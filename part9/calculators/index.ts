import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import express from 'express';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (
    !req.query.height ||
    !req.query.weight ||
    isNaN(height) ||
    isNaN(weight)
  ) {
    return res.status(400).json({ error: 'malformatted parameters' }).end();
  }

  const bmi = calculateBmi(height, weight);
  return res.json({ weight, height, bmi });
});

interface ExerciseInputHours {
  target: number;
  daily_exercises: number[];
}

app.post('/exercises', (req, res) => {
  const inputHours = req.body as ExerciseInputHours;
  if (
    !inputHours ||
    inputHours.target === undefined ||
    inputHours.daily_exercises === undefined
  ) {
    return res.status(400).json({ error: 'missing parameters' }).end();
  }
  if (
    isNaN(Number(inputHours.target)) ||
    !(inputHours.daily_exercises instanceof Array) ||
    inputHours.daily_exercises.some((value) => isNaN(Number(value)))
  ) {
    return res.status(400).json({ error: 'malformatted parameters' }).end();
  }

  return res.json(
    calculateExercises(inputHours.daily_exercises, inputHours.target)
  );
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
