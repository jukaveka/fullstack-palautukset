const Button = ({ text, onClick }) => {
  const buttonStyle = {
    margin: "10px 2px"
  }

  return (
    <>
      <button style={buttonStyle} onClick={onClick}>
        {text}
      </button>
    </>
  )
}

export default Button