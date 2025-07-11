import { createContext, useContext, useReducer } from "react"
import NotificationReducer from "../reducers/NotificationReducer"

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    NotificationReducer,
    null
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationState = () => {
  const notificationContext = useContext(NotificationContext)
  return notificationContext[0]
}

export const useNotificationDispatch = () => {
  const notificationContext = useContext(NotificationContext)
  return notificationContext[1]
}

export default NotificationContext
