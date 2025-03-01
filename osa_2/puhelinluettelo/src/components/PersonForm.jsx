import { useState } from 'react'

const PersonForm = ({ persons, setPersons }) => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const changeNameInput = (event) => {
    console.log("Input changed for name input element. Original value", newName, ", new value", event.target.value)

    setNewName(event.target.value)
  }

  const changeNumberInput = (event) => {
    console.log("Input changed for phone input element. Original value", newNumber, ", new value", event.target.value)

    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log("Button clicked to add new person, value", newName)

    const personNames = persons.map(person => person.name )

    if (personNames.includes(newName)) {
      alert(`${newName} is already in use`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
  
      console.log("Person object to be added to persons", personObject)
  
      setPersons(persons.concat(personObject))
      setNewName("")
      setNewNumber("")
    }
  }

  return (
  <div>
      <h2> Add new person to phonebook </h2>
      <form onSubmit={addPerson}>
          <label htmlFor="name"> Name </label>
          <p>
            <input id="name" name="name" value={newName} onChange={changeNameInput} />
          </p>
          <label htmlFor="number"> Phone number </label>
          <p>
            <input id="number" name="number" value={newNumber} onChange={changeNumberInput} />
          </p>
          <p>
            <button type="submit"> Add </button>
          </p> 
      </form>
  </div>
  )
}

export default PersonForm