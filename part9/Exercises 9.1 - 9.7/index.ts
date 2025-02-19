import express  from 'express'
const app = express()

import calculateBMI from './bmiCalculator'
import calculateExercises from './exerciseCalculator'

app.use(express.json())

app.get('/hello', (_req, res) => {
    res.send('hello')
})

app.get("/bmi", (req, res) => {
    const { height, weight } = req.query

    try {
        const heightValue: number = parseFloat(String(height));
        const weightValue: number = parseFloat(String(weight));
    
        if (isNaN(heightValue) || isNaN(weightValue)) {
          throw Error();
        }

        const bmi = calculateBMI(heightValue, weightValue)
    
        const bmiData = {
            height: heightValue, 
            weight: weightValue, 
            bmi
        }
        res.send(bmiData).status(200);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(404).json({
                error: 'malformatted parameters'
            })
        }
    }

})

app.post("/exercises", (req, res) => {
    const { daily_exercises: dailyExercises, target } = req.body

    try {
        if (!dailyExercises || !target) {
            throw new Error("Missing target or daily exercises");
        }
        
        if (!Array.isArray(dailyExercises   ) || dailyExercises.some(isNaN) || isNaN(Number(target))) {
            throw new Error("Invalid data: daily exercises must be an array of numbers and target must be a number");
        }
    
        const result = calculateExercises(target as number, dailyExercises as number[])
    
        res.json(result)
    } catch (error:unknown) {
        let errorMessage = 'Something went wrong: '
        if (error instanceof Error) {
            errorMessage += error.message
        }
        console.log(errorMessage)
    }
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})