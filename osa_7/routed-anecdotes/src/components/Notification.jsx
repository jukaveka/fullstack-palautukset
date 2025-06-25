const Notification = ({ notification }) => {
  const notificationStyle = {
    margin: "15px 0px",
    padding: "10px",
    borderStyle: "solid",
    borderColor: "#CDD6D0"
  }

  if (notification) {
    return <div style={notificationStyle}> { notification }</div>
  }

  return null 
}

export default Notification