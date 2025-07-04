import { createContext, useContext, useReducer } from "react"
import UserReducer from "../reducers/UserReducer"

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(UserReducer)

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const userContext = useContext(UserContext)
  return userContext[0]
}

export const useUserDispatch = () => {
  const userContext = useContext(UserContext)
  return userContext[1]
}

export default UserContext
