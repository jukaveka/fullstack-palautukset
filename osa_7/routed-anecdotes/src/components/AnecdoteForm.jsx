import { useField } from "../hooks"

const AnecdoteForm = (props) => {
  const buttonStyle = {
    margin: "5px 0px"
  }

  const content = useField("text")
  const author = useField("text")
  const info = useField("text")

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const resetInputs = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content <br/>
          <input {...content.attributes} />
        </div>
        <div>
          Author <br/>
          <input {...author.attributes} />
        </div>
        <div>
          URL for more info <br/>
          <input {...info.attributes} />
        </div>
        <button style={buttonStyle}> Create </button>
      </form>
      <button style={buttonStyle} onClick={resetInputs}> Reset </button>
    </div>
  )

}

export default AnecdoteForm