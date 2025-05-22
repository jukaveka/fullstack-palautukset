const Button = ({ text, onClick }) => {
  return (
    <>
      <p>
        <button onClick={onClick}>
          {text}
        </button>
      </p>
    </>
  )
}

export default Button