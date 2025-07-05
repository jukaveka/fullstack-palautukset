import BlogService from "../services/BlogService"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

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
      <h2>All blogs</h2>
      {sortedBlogs.map((blog) => (
        <p key={blog.id}>
          <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
        </p>
      ))}
    </div>
  )
}

export default BlogList
