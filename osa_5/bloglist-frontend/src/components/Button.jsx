import PropTypes from "prop-types"

const Button = ({ text, onClick, style }) => {
  return (
    <>
      <button style={style} onClick={onClick} data-testid={text}>
        {text}
      </button>
    </>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired
}

export default Button