import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <>
      <button onClick={onClick}>
        {text}
      </button>
    </>
  )
}

const Votes = ({ votes, selected }) => {
  const anecdoteVotes = votes[selected]

  return (
    <div>
      <p> Anecdote has {anecdoteVotes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const changeSelectedAnecdote = () => {
    console.log("Current selected index is", selected)

    const anecdoteIndex = getRandomInt() 

    setSelected(anecdoteIndex)

    console.log("New selected index is", anecdoteIndex)
  }

  const getRandomInt = () => {
    return Math.floor(Math.random() * (anecdotes.length))
  }

  const addVoteToAnecdote = () => {
    console.log("Votes are currently", votes)

    const updatedVotes = votes.concat()

    console.log("Updated votes list before updating values", updatedVotes)

    updatedVotes[selected] = updatedVotes[selected] + 1

    console.log("Updated votes list after updating value", updatedVotes)

    setVotes(updatedVotes)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <Votes votes={votes} selected={selected} />
      <Button onClick={addVoteToAnecdote} text={"Vote"} />
      <Button onClick={changeSelectedAnecdote} text={"Next anecdote"} />
    </div>
  )
}

export default App