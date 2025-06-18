import { createSlice } from "@reduxjs/toolkit"

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
export default anecdoteSlice.reducer