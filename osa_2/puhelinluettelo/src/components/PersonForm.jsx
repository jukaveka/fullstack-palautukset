import { useState } from 'react'
import PersonService from '../services/persons'

const PersonForm = ({ persons, setPersons, setSuccessMessage, setErrorMessage}) => {

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

    const newPersonObject = {
      name: newName,
      number: newNumber
    }

    console.log(`Checking if person ${newName} exists in phonebook`)

    const personNames = persons.map(person => person.name.toLowerCase())

    if (personNames.includes(newName.toLowerCase())) {
      console.log("Person with the name", newName, "already exists in phonebook. Requesting user to decide if number replaces the existing one")
      
      const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

      if (window.confirm(`${existingPerson.name} is already in phonebook. Would you like to replace their number?`)) {
        console.log("User confirmed number should be updated for existing entry", existingPerson)

        PersonService
          .update(existingPerson.id, newPersonObject)
          .then(updatedPerson => {
            console.log("Existing entry updated successfully. Updated entry returned by PersonService", updatedPerson)

            const updatedPersons = persons.map(person => 
              person.name.toLowerCase() !== updatedPerson.name.toLowerCase()
                ? person
                : updatedPerson
            )          

            console.log("Updating persons with array containing updated object", updatedPersons)

            setPersons(updatedPersons)

            console.log("Setting success message to confirm updating entry was successful")

            setSuccessMessage(`${updatedPerson.name} number updated to ${updatedPerson.number}`)

            console.log("Setting timeout to clear success message")

            setTimeout(() => {
              console.log("Clearing success message")

              setSuccessMessage(null)
            }, 2500)
          })
          .catch(error => {
            console.log(`Error with updating information of ${newName}`)
            
            console.log("Setting error message")

            setErrorMessage(JSON.stringify(error.response.data))

            console.log("Setting timeout to clear error message")

            setTimeout(() => {
              console.log("Clearing error message")

              setErrorMessage(null)
            }, 2500)
          })
      } else {
        console.log("User rejected updating number for existing entry", existingPerson)
      }

    } else {
      console.log(`Person ${newName} doesn't exist in phonebook. Adding new entry to phonebook`)

      console.log("Calling PersonService to create new entry with data", newPersonObject)

      PersonService
        .create(newPersonObject)
        .then(createdPerson => {
          console.log("New entry created successfully. Created entry returned by PersonService", createdPerson)

          console.log("Updating state variable persons to include new entry. Clearing out state variables newName and newNumber")

          setPersons(persons.concat(createdPerson))
          setNewName("")
          setNewNumber("")

          console.log("Setting success message to confirm creating entry was successful")

          setSuccessMessage(`${createdPerson.name} number added to phonebook`)

          console.log("Setting timeout for clearing success message")

          setTimeout(() => {
            console.log("Clearing success message")

            setSuccessMessage(null)
          }, 2500)
        })
        .catch(error => {
          console.log("Error with creating new entry", error.message)

          console.log("Setting error message")

          setErrorMessage(JSON.stringify(error.response.data))

          console.log("Setting timeout for clearing error message")

          setTimeout(() => {
            console.log("Clearing error message")

            setErrorMessage(null)
          }, 2500)
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