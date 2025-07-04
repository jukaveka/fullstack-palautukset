const User = require("../models/user")
const Blog = require("../models/blog")

const clearUsers = async () => {
  return await User.deleteMany({})
}

const clearBlogs = async () => {
  return await Blog.deleteMany({})
}

module.exports = {
  clearUsers,
  clearBlogs
}