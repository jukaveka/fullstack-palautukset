import BlogService from "../services/BlogService"
import { useQuery, useQueryClient } from "@tanstack/react-query"
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
import { useState } from "react"

const BlogList = () => {
  const [page, setPage] = useState(0)
  const [rowsOnPage, setRowsOnPage] = useState(5)
  const startIndex = page * rowsOnPage
  const endIndex = startIndex + rowsOnPage

  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(["blogs"])

  const sortedBlogs = blogs.toSorted((a, b) => (a.likes > b.likes ? -1 : 1))

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (event) => {
    setRowsOnPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const visibleBlogs = sortedBlogs.slice(startIndex, endIndex)

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h5"> Title </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5"> Author </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleBlogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link component={Link} to={`/blogs/${blog.id}`}>
                    {blog.title}
                  </Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                count={blogs.length}
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

export default BlogList
