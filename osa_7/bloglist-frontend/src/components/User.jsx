import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import userService from "../services/userService"

const User = () => {
  const params = useParams()
  const result = useQuery({
    queryKey: ["user"],
    queryFn: () => userService.getById(params.id),
    refetchOnWindowFocus: false,
  })

  if (result.isLoading) {
    return <div> Fetching user information </div>
  }

  if (result.isError) {
    return <div> Could not fetch user information from server </div>
  }

  const user = result.data

  return (
    <div>
      <h3> {user.name} </h3>
      <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </div>
  )
}

export default User
