const Total = ({courses}) => {
    const exercises = courses.parts.map(part => part.exercises)
    console.log(exercises) 

    const initialValue = 0;
    const total = exercises.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue) 

    return (
        <div>
            <p>Number of exercises: {total}</p>
        </div>
    )
}

export default Total;