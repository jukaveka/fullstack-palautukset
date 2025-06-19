import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"

const initialState = []

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers:
  {
    appendAnecdote(state, action) {
      return state.concat(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    },

    addVote(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export default anecdoteSlice.reducer