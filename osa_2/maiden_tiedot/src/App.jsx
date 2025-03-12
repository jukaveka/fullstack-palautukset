import { useState, useEffect } from 'react'
import Search from './components/Search'
import Results from './components/Results'
import CountryService from './services/countries'

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    console.log("Calling country service to fetch all data")

    CountryService
      .getAll()
      .then(allCountries => {
        console.log(`Requesting all countries successful. Data returned by CountryService ${allCountries}`)

        console.log(`Setting all countries to state variable "countries"`)

        setCountries(allCountries)
      })
  }, [])

  return (
    <div>
      <h1> Search for countries </h1>
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Results 
        countries={countries} 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  )
}

export default App
