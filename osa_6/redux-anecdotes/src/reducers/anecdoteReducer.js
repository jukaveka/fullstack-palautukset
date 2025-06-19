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

    updateVotedAnecdote(state, action) {
      const updatedAnecdote = action.payload
      const anecdotes = state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id
          ? anecdote
          : updatedAnecdote
        )

      return anecdotes
    }
  }
})

export const { appendAnecdote, setAnecdotes, updateVotedAnecdote } = anecdoteSlice.actions

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

export const addVote = (updatedAnecdote) => {
  return async dispatch => {
    const anecdote = await anecdoteService.addVote(updatedAnecdote)
    dispatch(updateVotedAnecdote(anecdote))
  }
}

export default anecdoteSlice.reducer