const Notification = ({ successMessage }) => {
  const successMessageStyle = {
    color: "#285238",
    fontSize: "20px",
    fontWeight: "bold",
    padding: "10px",
    border: "solid",
    borderColor: "#729EA1",
    borderSize: "10px"
  }

  if (successMessage === null) {
    return null
  }
  
  return (
    <div style={successMessageStyle}>
        <p> {successMessage} </p>
    </div>
  )
}

export default Notification