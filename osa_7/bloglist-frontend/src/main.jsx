import ReactDOM from "react-dom/client"
import App from "./App"
import { NotificationContextProvider } from "./context/NotificationContext"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { UserContextProvider } from "./context/UserContext"
import { BrowserRouter } from "react-router-dom"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <UserContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
)
