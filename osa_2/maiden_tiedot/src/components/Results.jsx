import Country from './Country'
import Button from './Button'

const Results = ({ countries, searchTerm, setSearchTerm }) => {
	if (searchTerm === "") {
		return null
	}

	console.log(`Filtering countries with search term ${searchTerm}`)

	const filteredCountries = countries.filter(country =>
		country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
	)

  console.log(`Filtered countries`, filteredCountries)

	const displaySelectedCountry = (commonName) => {
		console.log(`Button clicked to show full details of ${commonName}`)

		console.log(`Setting search term to ${commonName}`)

		setSearchTerm(commonName)
	}

	if (filteredCountries.length > 10) {
		console.log("Filtered countries contains over 10 countries. Rendering message")

		return (
			<div>
				<p> There's more than 10 countries with matching search term. </p>
			</div>
		)
	}

	if (filteredCountries.length < 11 && filteredCountries.length > 1) {
		console.log(`Filtered countries contains ${filteredCountries.length} countries. Rendering list of countries`)

		return (
			<div>
				<table>
					<tbody>
						{filteredCountries.map(country =>
							<tr key={country.cca2}>
								<td>
									{country.name.common}
								</td>
								<td>
									<Button
										onClick={() => displaySelectedCountry(country.name.common)}
										text="Show"
									/>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		)
	}

	if (filteredCountries.length === 1) {
		console.log("Filtered countries contains 1 country. Rendering detailed information of the country.")

		return (
			<Country country={filteredCountries[0]} />
		)
	}

	console.log("Filtered countries contains 0 countries. Rendering message")

	return (
		<div>
			<p> There's no countries that match your search term. </p>
		</div>
	)
}

export default Results