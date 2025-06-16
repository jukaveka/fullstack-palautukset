import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  const vote = (id) => {
    const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
    const newAnecdote = {
      ...votedAnecdote,
      votes: votedAnecdote.votes + 1 
    }
    const updatedAnecdotes = anecdotes.map(anecdote =>
      anecdote.id !== id ? anecdote : newAnecdote
    )
    dispatch(addVote(updatedAnecdotes))
}

  return (
    <>
      {
        anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Anecdotes