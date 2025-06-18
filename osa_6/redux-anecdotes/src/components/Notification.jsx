import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    margin: "10px 0px"
  }

  if (notification) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }

  return null
}

export default Notification