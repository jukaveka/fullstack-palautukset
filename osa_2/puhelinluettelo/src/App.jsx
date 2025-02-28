import { useState } from 'react'
import PersonForm from "./components/PersonForm"
import Directory from './components/Directory'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040 1231244' },
    { name: 'Marko Makkara', number: '+358501234567' },
    { name: 'Piia Paju', number: '040 0987654' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  const changeNameInput = (event) => {
    console.log("Input changed for name input element. Original value", newName, ", new value", event.target.value)

    setNewName(event.target.value)
  }

  const changeNumberInput = (event) => {
    console.log("Input changed for phone input element. Original value", newNumber, ", new value", event.target.value)

    setNewNumber(event.target.value)
  }

  const changeSearchInput = (event) => {
    console.log("Input changed for phone input element. Original value", search, ", new value", event.target.value)

    setSearch(event.target.value)

    event.target.value != ""
      ? setShowAll(false)
      : setShowAll(true)
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

  const filteredPersons = showAll
    ? persons
    : persons.filter(person => person.name.includes(search))

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <p>
          <label htmlFor="search"> Search with name </label>
        </p>
        <p>
          <input id="search" name="search" value={search} onChange={changeSearchInput} />
        </p>
      </form>
      <PersonForm onSubmit={addPerson} newName={newName} onNameInputChange={changeNameInput} newNumber={newNumber} onNumberInputChange={changeNumberInput} />
      <Directory showAll={showAll} persons={persons} search={search} />
    </div>
  )

}

export default App