const blog = require("../models/blog")
const Blog = require("../models/blog")

const nonExistingId = async () => {
  const blog = new Blog({ title: "Temp title", author: "Temp author", url: "Temp URL", likes: 0 })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})

  return blogs.map(team => team.toJSON())
}

const getSingleTestBlog = async () => {
  const blogs = await Blog.find({})

  const blogsInJson = blogs.map(team => team.toJSON())

  return blogsInJson[0]
}

module.exports = {
  nonExistingId,
  blogsInDb,
  getSingleTestBlog
}