interface HeightAndWeight {
  height: number
  weight: number
}

const parseBmiArguments = (args: Array<string>): HeightAndWeight => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (isNaN(Number(args[2]))) {
    throw new Error('Height must be a number')
  }
  if (isNaN(Number(args[3]))) {
    throw new Error('Weight must be a number')
  }

  return {
    height: Number(args[2]),
    weight: Number(args[3]),
  }
}

const calculateBmi = (heightInCm: number, weightInKg: number): string => {
  const bmi: number = weightInKg / Math.pow(heightInCm / 100, 2)
  if (bmi < 15) {
    return 'Very severely underweight'
  } else if (bmi >= 15 && bmi < 16) {
    return 'Severy underweight'
  } else if (bmi >= 16 && bmi < 18.5) {
    return 'Underweight'
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal (healthy weight)'
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight'
  } else if (bmi >= 30 && bmi < 35) {
    return 'Obese Class I (Moderately obese)'
  } else if (bmi >= 35 && bmi < 40) {
    return 'Obese Class II (Severely obese)'
  } else if (bmi >= 40) {
    return 'Obese Class III (Very severely obese)'
  }
}

try {
  const { height, weight } = parseBmiArguments(process.argv)
  console.log(calculateBmi(height, weight))
} catch (e) {
  console.log('Something went wrong: ', e.message)
}
