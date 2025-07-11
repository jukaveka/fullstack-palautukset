import { useState } from 'react'
import Menu from './components/Menu'
import Footer from './components/Footer'
import Notification from './components/Notification'
import Anecdote from './components/Anecdote'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import About from './components/About'
import { Route, Routes, useMatch, useNavigate} from 'react-router-dom'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState(null)

  const anecdoteMatch = useMatch("/anecdote/:id")

  const navigate = useNavigate()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate("/")
    setNotification(`Anecdote ${ anecdote.content } added to list`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const anecdote = anecdoteMatch
    ? anecdoteById(Number(anecdoteMatch.params.id))
    : null

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />
      <Routes>
        <Route path="/anecdote/:id" element={ <Anecdote anecdote={anecdote} /> } />
        <Route path="/" element={ <AnecdoteList anecdotes={anecdotes} /> } />
        <Route path="/create" element={ <AnecdoteForm addNew={addNew} /> } />
        <Route path="/about" element={ <About /> } />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
