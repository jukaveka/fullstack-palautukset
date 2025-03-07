import { useState } from 'react'
import PersonService from '../services/persons'

const PersonForm = ({ persons, setPersons }) => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const changeNameInput = (event) => {
    setNewName(event.target.value)
  }

  const changeNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    
    console.log("Button clicked to add new person, values", newName, newNumber)

    const personNames = persons.map(person => person.name.toLowerCase())

    if (personNames.includes(newName.toLowerCase())) {
      alert(`${newName} is already in use`)

      console.log("Person with the name", newName, "already exists. Skipping addition of new person")

    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
  
      console.log("Person object to be added to persons", personObject)

      PersonService
        .create(personObject)
        .then(createdPerson => {
          console.log("Created person returned by PersonService", createdPerson)

          setPersons(persons.concat(personObject))
          setNewName("")
          setNewNumber("")
        })
    }
  }

  return (
  <div>
      <h2> Add new person to phonebook </h2>
      <form onSubmit={addPerson}>
          <label htmlFor="name"> Name </label>
          <p>
            <input id="name" name="name" value={newName} onChange={changeNameInput} required/>
          </p>
          <label htmlFor="number"> Phone number </label>
          <p>
            <input id="number" name="number" value={newNumber} onChange={changeNumberInput} required />
          </p>
          <p>
            <button type="submit"> Add </button>
          </p> 
      </form>
  </div>
  )
}

export default PersonForm