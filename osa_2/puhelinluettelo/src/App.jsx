import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040 1231244'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  console.log("State variable persons", persons)
  console.log("State variable newName", newName)
  console.log("State variable newNumber", newNumber)

  const changeNameInput = (event) => {
    console.log("Input changed for name input element. Original value", newName, ", new value", event.target.value)

    setNewName(event.target.value)
  }

  const changeNumberInput = event => {
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
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <label htmlFor="name"> Name </label>
          <p>
            <input id="name" name="name" value={newName} onChange={changeNameInput} />
          </p>
        </div>
        <div> 
          <label htmlFor="number"> Phone number </label>
          <p>
            <input id="number" name="number" value={newNumber} onChange={changeNumberInput} />
          </p>
        </div>
        <div> 
          <p>
            <button type="submit"> Add </button>
          </p> 
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => 
          <p key={person.name}> {person.name} {person.number} </p>)}
    </div>
  )

}

export default App