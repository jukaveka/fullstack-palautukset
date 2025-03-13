const Weather = ({ country, countryWeather }) => {

	if (countryWeather.length === 0) {
		return null
	}

	const weatherIconId = countryWeather.weather[0].icon
	const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconId}@2x.png`

	console.log(`Weather icon ID ${weatherIconId}`)
	console.log(`Weather icon URL ${weatherIconUrl}`)

	console.log("Rendering country weather information")

	return (
		<div>
			<h2> Weather in {country.capital}, capital of {country.name.common} </h2>
			<p> Temperature is {countryWeather.main.temp}, and feels like {countryWeather.main.feels_like} </p>
			<img src={weatherIconUrl} />
			<p> Wind speed is {countryWeather.wind.speed} m/s</p>
		</div>
	)
}

export default Weather