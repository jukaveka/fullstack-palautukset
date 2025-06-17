import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import PropTypes from "prop-types"

const Anecdote = ({ anecdote, onClick }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => onClick(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.toSorted((a, b) => b.votes - a.votes))

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
          <Anecdote 
            key={anecdote.id} 
            anecdote={anecdote}
            onClick={vote}
          />
        )
      }
    </>
  )
}

export default AnecdoteList