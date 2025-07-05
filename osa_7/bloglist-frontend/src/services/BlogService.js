import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getById = async (blogId) => {
  const requestUrl = `${baseUrl}/${blogId}`
  const response = await axios.get(requestUrl)

  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.post(baseUrl, newBlog, config)

  return response.data
}

const addLike = async (updatedBlog) => {
  const requestUrl = `${baseUrl}/${updatedBlog.id}`
  const response = await axios.put(requestUrl, updatedBlog)

  return response.data
}

const remove = async (blogToRemove) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const requestUrl = `${baseUrl}/${blogToRemove.id}`
  const response = await axios.delete(requestUrl, config)

  return response.data
}

export default { getAll, create, setToken, addLike, remove }
