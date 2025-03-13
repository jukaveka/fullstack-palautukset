import axios from 'axios'

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?"

const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const getWeather = country => {
    console.log("Fetching weather information from OpenWeather API")

    console.log(`Country object passed to getWeather function in WeatherService`, country)

    console.log(`Country ${country.name.common}, capital ${country.capital}, units metric`)

    const requestUrl = `${baseUrl}q=${country.capital}&appid=${apiKey}&units=metric`

    console.log(`Request URL ${requestUrl}`)

    const request = axios.get(requestUrl)

    console.log(`Request`, request)

    return request.then(response => response.data).catch(error => error.message)
}

export default { getWeather }