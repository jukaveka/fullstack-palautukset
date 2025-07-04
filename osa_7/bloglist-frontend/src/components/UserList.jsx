import { useQuery } from "@tanstack/react-query"
import userService from "../services/userService"
import { Link } from "react-router-dom"

const UserList = () => {
  const result = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
  })

  if (result.isLoading) {
    return <div> Loading users </div>
  }

  if (result.isError) {
    return <div> Could not fetch users from the servers </div>
  }

  const users = result.data

  return (
    <div>
      <h3> Users </h3>
      <table>
        <thead>
          <tr>
            <th> Name </th>
            <th> Blogs created </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
