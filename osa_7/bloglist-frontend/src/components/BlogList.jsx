import BlogService from "../services/BlogService"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"

const BlogList = () => {
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: BlogService.getAll,
    refetchOnWindowFocus: false,
  })

  if (result.isPending) {
    return <div> Loading blog data </div>
  }

  if (result.isError) {
    return <div> Error fetching blogs. ${result.error}</div>
  }

  const blogs = result.data

  const sortedBlogs = blogs.toSorted((a, b) => (a.likes > b.likes ? -1 : 1))

  return (
    <div>
      <Typography variant="h4"> All blogs </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> Title </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedBlogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell component={Link} to={`/blogs/${blog.id}`}>
                  <Typography> {blog.title} </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList
