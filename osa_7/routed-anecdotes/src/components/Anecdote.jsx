const Anecdote = ({ anecdote }) => {
  const rowStyle = {
    margin: "15px 0px"
  }

  return (
    <div>
      <h2> { anecdote.content } </h2>
      <div style={rowStyle}> Has { anecdote.votes } votes </div>
      <div style={rowStyle}> For more info see <a href={ anecdote.info } > { anecdote.info } </a> </div>
    </div>
  )
} 

export default Anecdote