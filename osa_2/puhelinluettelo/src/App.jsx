import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Directory from './components/Directory'
import Search from './components/Search'
import Notification from './components/Notification'
import PersonService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [successMessage, setSuccessMessage] = useState(null)

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
      <Notification successMessage={successMessage} />
      <Search search={search} setSearch={setSearch} setShowAll={setShowAll} />
      <PersonForm persons={persons} setPersons={setPersons} setSuccessMessage={setSuccessMessage} />
      <Directory showAll={showAll} persons={persons} setPersons={setPersons} search={search} setSuccessMessage={setSuccessMessage} />
    </div>
  )

}

export default App