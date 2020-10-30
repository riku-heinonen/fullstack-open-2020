interface ExerciseInput {
  targetHours: number
  dailyHours: number[]
}

interface ExerciseResults {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const parseExerciseArguments = (args: string[]): ExerciseInput => {
  if (args.length < 4) throw new Error('Not enough arguments')

  if (isNaN(Number(args[2]))) {
    throw new Error('Target exercise hours must be a number')
  }
  const targetHours = Number(args[2])
  const dailyHours = args.slice(3).map(Number)
  dailyHours.forEach((hours) => {
    if (isNaN(hours)) throw new Error('Daily exercise hours must be numbers')
  })

  return {
    targetHours,
    dailyHours,
  }
}

const calculateExercises = (
  dailyHours: number[],
  targetHours: number
): ExerciseResults => {
  const ratingDescriptions = [
    'plain awful...',
    'not too bad but could be better',
    'target achieved, great work!',
  ]
  const periodLength = dailyHours.length
  const trainingDays = dailyHours.filter((amount) => amount != 0).length
  const totalHours = dailyHours.reduce((acc, val) => acc + val, 0)
  const averageHours = totalHours / periodLength
  const rating = Math.max(
    Math.min(Math.floor(3 * (averageHours / targetHours)), 3),
    1
  )
  const ratingDescription = ratingDescriptions[rating - 1]
  const success = averageHours >= targetHours
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetHours,
    average: averageHours,
  }
}

try {
  const { targetHours, dailyHours } = parseExerciseArguments(process.argv)
  console.log(calculateExercises(dailyHours, targetHours))
} catch (e) {
  console.log('Something went wrong: ', e.message)
}
