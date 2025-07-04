import ReactDOM from "react-dom/client"
import App from "./App"
import { NotificationContextProvider } from "./context/NotificationContext"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { UserContextProvider } from "./context/UserContext"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
)
