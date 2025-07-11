import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import PropTypes from "prop-types"

const Anecdote = ({ anecdote, onClick }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} <button onClick={() => onClick(anecdote.id)}>vote</button>
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

  const anecdotes = useSelector(({ anecdotes }) => anecdotes)
  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)

  const filter = useSelector(({ filter }) => filter)
  const filteredAnecdotes = sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  const vote = (id) => {
    const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
    const updatedAnecdote = {
      ...votedAnecdote,
      votes: votedAnecdote.votes + 1
    }

    dispatch(addVote(updatedAnecdote))
    dispatch(setNotification(`You voted "${votedAnecdote.content}"`, 5))
  }

  return (
    <>
      {
        filteredAnecdotes.map(anecdote =>
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