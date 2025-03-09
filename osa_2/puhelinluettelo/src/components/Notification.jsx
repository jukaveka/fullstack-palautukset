const Notification = ({ successMessage }) => {
  if (successMessage === null) {
    return null
  }
  
  return (
    <div>
        <p> {successMessage} </p>
    </div>
  )
}

export default Notification