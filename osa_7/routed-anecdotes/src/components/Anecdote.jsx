const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2> { anecdote.content } </h2>
      <div> Has { anecdote.votes } votes </div>
      <div> For more info see { ənecdote.info } </div>
    </div>
  )
}

export default Anecdote