import { parseArguments } from "./utils";

interface OperateValues {
    value1: number;
    value2: number
}

const processArguments = (args: string[]): OperateValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    const values = parseArguments(args)

    return {
        value1: values[0],
        value2: values[1]
    }
}

const calculateBMI = (height: number, weight: number) => {
    const BMI = weight / ((height / 100) ** 2) 

    if (BMI < 18.5) {
        return "Underweight"
    } else if (BMI >= 18.5 && BMI < 24.9) {
        return "Normal (healthy weight)"
    } else if (BMI >= 25 && BMI < 30) {
        return "Overweight"
    } else {
        return "Obese"
    }
}

try {
    const {value1, value2} = processArguments(process.argv);
    console.log(calculateBMI(value1, value2))
} catch (error: unknown) {
    let errorMessage = 'Something bad happened'
    if (error instanceof Error) {
        errorMessage += 'Error:' + error.message
    }
    console.log(errorMessage)
}

export default calculateBMI