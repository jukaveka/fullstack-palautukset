import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    const requestUrl = `${baseUrl}/all/`

    console.log(`Fetching all countries from ${requestUrl}`)

    const request = axios.get(requestUrl)

    console.log(`Request `, request)

    return request.then(response => response.data)
}

export default { getAll }