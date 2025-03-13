import { useState, useEffect } from 'react'
import WeatherService from '../services/weather'

const Country = ({ country }) => {
    const [countryWeather, setCountryWeather] = useState([])
	console.log("Prop passed to Country component", country)

	console.log(`Rendering detailed information of ${country.name.common}`)

    useEffect(() => {
        WeatherService
		.getWeather(country)
		.then(weatherData => {
			console.log(`Data returned by WeatherService`, weatherData)

            setCountryWeather(weatherData)
		})
    }, [])

	return (
		<div>
			<h1> {country.name.common} </h1>
			<p> Capital - {country.capital} </p>
			<p> Area - {country.area} </p>
			<h2> Languages </h2>
			<ul>
				{Object.keys(country.languages).map(key =>
					<li key={key}> {country.languages[key]} </li>
				)}
			</ul>
			<img
				src={country.flags.png}
				alt="Flag of Switzerland, consisting of square red background and white fat cross in the middle"
			/>
		</div >
	)
}

export default Country