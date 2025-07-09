import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"
import userService from "../services/userService"
import {
  Box,
  Grid,
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
import { useState } from "react"

const User = () => {
  const [page, setPage] = useState(0)
  const [rowsOnPage, setRowsOnPage] = useState(10)
  const startIndex = page * 5
  const endIndex = startIndex + rowsOnPage
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

  const visibleBlogs = user.blogs.slice(startIndex, endIndex)

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const handleRowsOnPageChange = (event) => {
    setRowsOnPage(event.target.value)
    setPage(0)
  }

  return (
    <div>
      <Box
        sx={{ display: "flex", justifyContent: "center", paddingTop: "50px" }}
      >
        <Paper
          elevation={1}
          sx={{
            minWidth: 200,
            maxWidth: 700,
            flexGrow: 1,
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              textAlign: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <Grid size={12}>
              <Typography variant="h6"> {user.name} </Typography>
            </Grid>
            <Grid size={6}>
              <Typography> Username</Typography>
              <Typography variant="h6"> {user.username} </Typography>
            </Grid>
            <Grid size={6}>
              <Typography> Blogs added </Typography>
              <Typography variant="h6"> {user.blogs.length} </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", paddingTop: "50px" }}
      >
        <Paper
          elevation={2}
          sx={{
            minWidth: 400,
            maxWidth: 800,
            flexGrow: 1,
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell> Blogs added </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleBlogs.map((blog) => {
                  return (
                    <>
                      <TableRow>
                        <TableCell>
                          <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
                        </TableCell>
                      </TableRow>
                    </>
                  )
                })}
              </TableBody>
            </Table>
            <TableFooter>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                count={user.blogs.length}
                page={page}
                onPageChange={handlePageChange}
                rowsPerPage={rowsOnPage}
                onRowsPerPageChange={handleRowsOnPageChange}
              />
            </TableFooter>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  )
}

export default User
