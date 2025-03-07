import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    console.log("Request URL", baseUrl)
    
    const request = axios.get(baseUrl)

    console.log("Request", request)

    return request.then(response => response.data)
}

export default { getAll }