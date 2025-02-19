interface ExerciseValues {
    target: number
    dailyExercises: number[]
}

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const getRating = (average: number ,target: number) => {
    const averageHoursInPercentage = (average / target) * 100

    if (averageHoursInPercentage < 50) {
        return 1;
    } else if (averageHoursInPercentage >= 50 && averageHoursInPercentage < 100) {
        return 2;
    } else {
        return 3;
    }
}

const getRatingDescription = (rating: number): string => {
    switch (rating) {
        case 1:
            return "bad, good luck next weekend";
        case 2:
            return "not too bad but could be better";
        case 3: 
            return "nice one!"
        default: 
            return "Invalid rating"
    }
}


const parseArguments = (args: string[]): ExerciseValues => {

    const target = Number(args[2])

    if(isNaN(target)) {
        throw new Error ('First argument must be a number!')
    }

    const dailyHours = args.slice(3).map((value, index) => {
        const num = Number(value);
        if (isNaN(num)) {
            throw new Error(`Provided value at position ${index + 3} is not a number: ${value}`);
        }
        return num;
    });

    return {
        target,
        dailyExercises: dailyHours
    };
}

const calculateExercises = (target: number, daily_exercises: number[]): Result => {

    const totalTrainingHours = daily_exercises.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    })
    const objetive = target * daily_exercises.length

    const periodLength = daily_exercises.length
    const realTrainingDays = daily_exercises.filter((day) => day !== 0).length;
    const success = totalTrainingHours >= objetive
    const average = totalTrainingHours / periodLength
    const rating = getRating(average, target) 

    return {
        periodLength: periodLength,
        trainingDays: realTrainingDays,
        success: success,
        rating: rating,
        ratingDescription: getRatingDescription(rating),
        target: target,
        average: average
    }
}

try {
    const { target, dailyExercises: dailyHours } = parseArguments(process.argv);
    console.log(calculateExercises(target, dailyHours));
} catch (error: unknown) {
    let errorMessage = 'Someting bad happened. '
    if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message
    }
    console.log(errorMessage)
}

export default calculateExercises