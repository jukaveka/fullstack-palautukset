import Blog from './Blog'
const BlogList = ({ blogs, setBlogs }) => {
  const updateBlogs = (updatedBlog) => {
    const blogIndex = blogs.findIndex((blog) => blog.id === updatedBlog.id)

    const updatedBlogs = blogs.toSpliced(blogIndex, 1, updatedBlog)

    setBlogs(updatedBlogs)
  }

  const sortedBlogs = blogs.toSorted((a, b) => a.likes > b.likes ? -1 : 1)

  return (
    <div>
      <h2>All blogs</h2>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlogs={updateBlogs} />
      )}
    </div>
  )
}

export default BlogList