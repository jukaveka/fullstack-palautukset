import { useDispatch } from "react-redux"
import { setNotification, clearNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdoteService"
import { addAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""

    const anecdote = await anecdoteService.createNew(content)

    dispatch(addAnecdote(anecdote))
    dispatch(setNotification(`You added anecdote "${content}"`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000);
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