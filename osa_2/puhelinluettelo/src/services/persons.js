import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    console.log("Fetch all request URL", baseUrl)
    
    const request = axios.get(baseUrl)

    console.log("Fetch all request", request)

    return request.then(response => response.data)
}

const create = newObject => {
    console.log("Create request URL", baseUrl)
    console.log("Object to be added", newObject)

    const request = axios.post(baseUrl, newObject)

    console.log("Create request", request)

    return request.then(response => response.data)
}

const remove = id => {
    const requestUrl = `${baseUrl}/${id}`

    console.log("Removal Request URL", requestUrl)

    const request = axios.delete(requestUrl)

    console.log("Removal Request", request)

    return request.then(response)
}

const update = (id, newObject) => {
    const requestUrl = `${baseUrl}/${id}`

    console.log("Update request URL", requestUrl)

    const request = axios.put(requestUrl, newObject)

    console.log("Update request", request)

    return request.then(response => response.data)
}

export default { getAll, create, remove, update}