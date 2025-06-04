const Blog = require("../models/blog")
const userService = require("./userService")

const fetchAllBlogs = async () => {
  const blogs = await Blog
    .find({})
    .populate("user", { username: 1, name: 1 })

  return blogs
}

const saveBlog = async (blog, request, user) => {
  blog.title = request.title
  blog.author = request.author
  blog.url = request.url
  blog.user = user
  blog.likes = !request.likes
    ? 0
    : request.likes

  return await blog.save()
}

const findBlog = async (id) => {
  return await Blog.findById(id)
}

const deleteBlog = async (id) => {
  return await Blog.findByIdAndDelete(id)
}

const nonexistentBlog = async (id) => {
  const blog = await findBlog(id)

  return !blog
}

const saveBlogAndUpdateUser = async (request) => {
  const addedBlog = await saveBlog(new Blog(), request.body, request.user)

  const blogUser = await userService.findUser(addedBlog.user)

  blogUser.blogs = blogUser.blogs.concat(addedBlog._id)
  await blogUser.save()

  return addedBlog
}

module.exports = {
  fetchAllBlogs,
  saveBlog,
  findBlog,
  deleteBlog,
  nonexistentBlog,
  saveBlogAndUpdateUser,
}