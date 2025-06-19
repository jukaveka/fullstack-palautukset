import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"

const initialState = []

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers:
  {
    addAnecdote(state, action) {
      return state.concat(action.payload)
    },

    addVote(state, action) {
      return action.payload
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer