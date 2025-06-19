import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { addAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""

    dispatch(addAnecdote(content))
    dispatch(setNotification(`You added anecdote "${content}"`, 5));
  }
 
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name="anecdote" /></div><br/>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm