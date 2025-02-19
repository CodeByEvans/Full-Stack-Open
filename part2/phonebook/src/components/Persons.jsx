const Persons = ({persons, handleDelete}) => {
    return (
        <ul>
            {persons.map(person => {
                return(
                    <p key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button></p>
                )
            })}
        </ul>
    )
}

export default Persons;