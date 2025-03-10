import { useState } from 'react'
import Search from './components/Search'
import CountryService from './services/countries'

function App() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div>
      <h1> Search for countries </h1>
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  )
}

export default App
