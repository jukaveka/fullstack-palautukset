import { useEffect, useState } from 'react'
import PersonForm from "./components/PersonForm"
import Directory from './components/Directory'
import Search from './components/Search'
import PersonService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    PersonService
      .getAll()
      .then(allPersons => {
        console.log("Data returned by PersonService", allPersons)

        setPersons(allPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Search search={search} setSearch={setSearch} setShowAll={setShowAll} />
      <PersonForm persons={persons} setPersons={setPersons} />
      <Directory showAll={showAll} persons={persons} setPersons={setPersons} search={search} />
    </div>
  )

}

export default App