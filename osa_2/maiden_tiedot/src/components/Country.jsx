import { useState, useEffect } from 'react'
import WeatherService from '../services/weather'
import CountryDetail from './CountryDetail'
import Weather from './Weather'

const Country = ({ country }) => {
	const [countryWeather, setCountryWeather] = useState([])

	console.log("Prop passed to Country component", country)

	useEffect(() => {
		console.log(`Fetching weather data of ${country.name.common}`)

		WeatherService
			.getWeather(country)
			.then(weatherData => {
				console.log(`Data returned by WeatherService`, weatherData)

				setCountryWeather(weatherData)
			})
	}, [])

	console.log(`Rendering detailed information of ${country.name.common}`)

	return (
		<div>
			<CountryDetail country={country} />
			<Weather country={country} countryWeather={countryWeather} />
		</div >
	)
}

export default Country