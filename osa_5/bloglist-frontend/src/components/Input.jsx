import PropTypes from "prop-types"

const Input = ({ label, type, value, onChange }) => {

  return (
    <>
      <p>
        <label> {label} </label>
      </p>
      <input
        id={label}
        data-testid={`${label}Input`}
        type={type}
        value={value}
        onChange={onChange}
      />
    </>
  )
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Input