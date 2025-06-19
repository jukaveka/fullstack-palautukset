import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationMessage(state, action) {
      return action.payload
    },
    
    clearNotificationMessage() {
      return null
    }
  }
})

export const { setNotificationMessage, clearNotificationMessage } = notificationSlice.actions

export const setNotification = (message, timeoutInSeconds) => {
  return dispatch => {
    dispatch(setNotificationMessage(message))

    const timeout = timeoutInSeconds * 1000
    setTimeout(() => {
      dispatch(clearNotificationMessage())
    }, timeout)
  }
}

export default notificationSlice.reducer