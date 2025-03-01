import { useState } from 'react'
import PersonForm from "./components/PersonForm"
import Directory from './components/Directory'
import Search from './components/Search'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040 1231244' },
    { name: 'Marko Makkara', number: '+358501234567' },
    { name: 'Piia Paju', number: '040 0987654' }
  ]) 
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

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