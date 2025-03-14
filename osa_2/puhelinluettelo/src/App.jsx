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
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log("Fetching contents of phonebook with Person service")

    PersonService
      .getAll()
      .then(allPersons => {
        console.log("Data returned by Person service", allPersons)

        console.log("Setting data returned by Person service to state variable 'persons'")

        setPersons(allPersons)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        successMessage={successMessage} 
        errorMessage={errorMessage}
      />
      <Search 
        search={search} 
        setSearch={setSearch} 
        setShowAll={setShowAll} 
      />
      <PersonForm 
        persons={persons} 
        setPersons={setPersons} 
        setSuccessMessage={setSuccessMessage} 
        setErrorMessage={setErrorMessage} 
      />
      <Directory 
        showAll={showAll} 
        persons={persons} 
        setPersons={setPersons} 
        search={search} 
        setSuccessMessage={setSuccessMessage} 
        setErrorMessage={setErrorMessage} 
      />
    </div>
  )

}

export default App