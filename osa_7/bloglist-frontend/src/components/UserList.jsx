import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import userService from "../services/userService"
import { Link } from "react-router-dom"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material"

const UserList = () => {
  const [page, setPage] = useState(0)
  const [rowsOnPage, setRowsOnPage] = useState(5)
  const startIndex = page * 5
  const endIndex = startIndex + rowsOnPage
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

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (event) => {
    setRowsOnPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const visibleUsers = users.slice(startIndex, endIndex)

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h5"> User </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5"> Submissions </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleUsers.map((user) => (
              <TableRow key={`${user.id}-${user.username}`}>
                <TableCell>
                  <Link component={Link} to={`/users/${user._id}`}>
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                count={users.length}
                page={page}
                onPageChange={handlePageChange}
                rowsPerPage={rowsOnPage}
                onRowsPerPageChange={handleRowsPerPageChange}
              ></TablePagination>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList
