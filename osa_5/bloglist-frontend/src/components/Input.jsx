const Input = ({ label, type, value, onChange }) => {

  return (
    <>
      <p>
        <label> {label} </label>
      </p>
      <input
        type={type}
        value={value}
        onChange={onChange}
      />
    </>
  )
}

export default Input