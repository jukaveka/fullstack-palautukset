import { createSlice } from "@reduxjs/toolkit"

const initialState = "Yaas"

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    
    removeNotification() {
      return null
    }
  }
})

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer