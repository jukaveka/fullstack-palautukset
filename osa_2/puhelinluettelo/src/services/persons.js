import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    console.log("Request URL", baseUrl)
    
    const request = axios.get(baseUrl)

    console.log("Request", request)

    return request.then(response => response.data)
}

const create = newObject => {
    console.log("Request URL", baseUrl)
    console.log("Object to be added", newObject)

    const request = axios.post(baseUrl, newObject)

    console.log("Request", request)

    return request.then(response => response.data)
}

export default { getAll, create }