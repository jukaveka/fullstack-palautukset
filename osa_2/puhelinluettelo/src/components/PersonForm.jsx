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
      console.log("Person with the name", newName, "already exists. Requesting user to decide if number replaces the existing one")
      
      const existingPerson = persons.find(person => person.name === newName)

      if (window.confirm(`${existingPerson} is already in phonebook. Would you like to replace their number?`)) {
        console.log("Existing person object", existingPerson)
        
        const personObject = {
          name: newName,
          number: newNumber
        }

        PersonService
          .update(existingPerson.id, personObject)
          .then(updatedPerson => {
            console.log("Updated person returned by PersonService", updatedPerson)

            const updatedPersons = persons.map(person => 
              person.name !== updatedPerson.name
                ? person
                : updatedPerson
            )

            console.log("Mapped array with updated person", updatedPersons)

            setPersons(updatedPersons)
          })
      }

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