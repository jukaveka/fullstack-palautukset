import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
} 

const createNew = async (content) => {
  const anecdoteObject = { content, votes: 0}
  const response = await axios.post(baseUrl, anecdoteObject)
  return response.data
}

const addVote = async (updatedAnecdote) => {
  const requestUrl = `${baseUrl}/${updatedAnecdote.id}`
  const response = await axios.put(requestUrl, updatedAnecdote)
  return response.data
}

export default { getAll, createNew, addVote }