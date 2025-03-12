import Country from './Country'
import Button from './Button'

const Results = ({ countries, searchTerm, setSearchTerm }) => {
    if (searchTerm === "") {
        return null
    }

    console.log(`Filtering countries with search term ${searchTerm}`)

    const filteredCountries = countries.filter(country =>
        country.name.common.includes(searchTerm)
    )

    console.log(`Filtered countries with search term ${searchTerm}. Length of array ${filteredCountries.length}`)

    const displaySelectedCountry = (commonName) => {
        setSearchTerm(commonName)
    }

    if (filteredCountries.length > 10) {
        return (
            <div>
                <p> There's more than 10 countries with matching search term. </p>
            </div>
        )
    }

    if (filteredCountries.length < 11 && filteredCountries.length > 1) {
        return (
            <div>
                <ul>
                    {filteredCountries.map(country =>
                        <li key={country.cca2}> 
                            {country.name.common} 
                            <Button 
                                onClick={() => displaySelectedCountry(country.name.common)} 
                                text="Show" 
                            />
                        </li>
                    )}
                </ul>

            </div>
        )
    }

    if (filteredCountries.length === 1) {
        return (
            <Country country={filteredCountries[0]} />
        )
    }

    return (
        <div>
            <p> There's no countries that match your search term. </p>
        </div>
    )
}

export default Results