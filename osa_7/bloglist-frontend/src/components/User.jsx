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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> Blogs added </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.blogs.map((blog) => {
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
      </TableContainer>
    </div>
  )
}

export default User
