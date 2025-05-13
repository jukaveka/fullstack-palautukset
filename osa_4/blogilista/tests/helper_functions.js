const Blog = require("../models/blog")
const User = require("../models/user")

const nonExistingId = async () => {
  const blog = new Blog({ title: "Temp title", author: "Temp author", url: "Temp URL", likes: 0 })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})

  return blogs.map(blog => blog.toJSON())
}

const getSingleTestBlog = async () => {
  const blogs = await Blog.find({})

  const blogsInJson = blogs.map(blog => blog.toJSON())

  return blogsInJson[0]
}

const usersInDb = async () => {
  const users = await User.find({})

  return users.map(user => user.toJSON())
}

const getValidUserId = async () => {
  const user = await User.findOne({})

  return user._id
}

module.exports = {
  nonExistingId,
  blogsInDb,
  getSingleTestBlog,
  usersInDb,
  getValidUserId
}