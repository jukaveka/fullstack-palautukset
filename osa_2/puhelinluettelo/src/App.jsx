import { useEffect, useState } from 'react'
import axios from 'axios'
import PersonForm from "./components/PersonForm"
import Directory from './components/Directory'
import Search from './components/Search'

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log(response)
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Search search={search} setSearch={setSearch} setShowAll={setShowAll} />
      <PersonForm persons={persons} setPersons={setPersons} />
      <Directory showAll={showAll} persons={persons} search={search} />
    </div>
  )

}

export default App