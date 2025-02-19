import { useState, useEffect } from 'react'
import personService from './services/persons';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';


const App = () => {
  const [persons, setPersons] = useState([
  ]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState(null)
  const [notification, setNotification] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const submitForm = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      important: Math.random() > 0.5,
    }

    const nameExists = persons.some(person=> person.name === newName)

    if (nameExists) {
      const personObj = persons.find(person => person.name === newName);
      const updatedPerson = {...personObj, number:newNumber}

      if (window.confirm(`${newName} is already added to phonebook, replace the old nomber with the new one?`)) {
        personService
          .update(personObj.id, updatedPerson)
          .then(returnedNumber => {
            setPersons(persons.map(person => person.id !== personObj.id ? person : returnedNumber))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      personService
        .create(nameObject)
        .then(returnedName => {
          setPersons(persons.concat(returnedName))
          setNewName('')
          setNewNumber('')
          setNotification ('success')
          setMessage(`Added ${nameObject.name}!`);
          setTimeout(() => {
            setMessage(null);
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          console.error(error.response.data.error)
          setNotification('error')
          if (error.response.data.error.includes('is not a valid phone number')){
            setMessage('Phone number must be at least 8 characters long and follow the format X-XXXXXXX.')
          }else if (error.response.data.error.includes('at least 8 characters long')) {
            setMessage('The phone number must be at least 8 characters long.')
          } else if (error.response.data.error.includes('at least 3 characters long')){
            setMessage('The name must be at least 3 characters long.')
          } else {
            setMessage('None of the fields can be empty.')
          }
          setTimeout(() => {
            setMessage(null)
            setNotification(null)
          }, 5000)
      })
    }
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  
  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage(`Success! You deleted ${person.name} from the Phonebook`)
          setTimeout(() => {
            setMessage(null)
            setNotification(null)
          }, 5000)
        })
        .catch((err) => {
          setNotification('error')
          setMessage(`Error! ${person.name} has already been deleted`)
          setTimeout(() => {
            setMessage(null)
            setNotification(null)
          }, 5000)
        })
    }
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification status={notification} message={message}/>

      <Filter value={search} onChange={handleSearch}/>

      <h3>Add a new</h3>

      <PersonForm onSubmit={submitForm} newName={newName} handleNoteChange={handleNoteChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      
      <h3>Numbers</h3>

      <Persons persons={personsToShow} handleDelete={handleDelete}  />
    </div>
  )
}

export default App