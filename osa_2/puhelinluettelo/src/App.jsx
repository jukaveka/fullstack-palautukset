import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  console.log("State variable persons", persons)
  console.log("State variable newName", newName)

  const changeNameInput = (event) => {
    console.log("Input changed for name input element. Original value", newName, ", new value", event.target.value)

    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log("Button clicked to add new person, value", newName)

    const personObject = {
      name: newName
    }

    console.log("Person object to be added to persons", personObject)

    setPersons(persons.concat(personObject))
    setNewName("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={changeNameInput} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person => 
          <p key={person.name}> {person.name} </p>)}
    </div>
  )

}

export default App