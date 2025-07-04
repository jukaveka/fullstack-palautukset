const Blog = require("../models/blog")
const User = require("../models/user")
const tokenService = require("../services/tokenService")
const hashUtil = require("../utils/hash")

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
  const testBlog = await Blog.findOne({})

  return testBlog.toJSON()
}

const usersInDb = async () => {
  const users = await User.find({})

  return users.map(user => user.toJSON())
}

const getValidUserId = async () => {
  const user = await User.findOne({})

  return user._id
}

const getSingleTestUser = async () => {
  const user = await User.findOne({})

  return user.toJSON()
}

const generateTestToken = async (user) => {
  return tokenService.generateJwtToken(user)
}

const decodeTestUserToken = (token) => {
  return tokenService.decodeJwtToken(token)
}

const generateHashForUser = async (testUserObject) => {
  testUserObject.passwordHash = await hashUtil.generatePasswordHash(testUserObject.password)

  return testUserObject
}

const addHashedPasswordsToUsers = async (testUserArray) => {
  const promiseArray = testUserArray.map(testUser => generateHashForUser(testUser))

  return await Promise.all(promiseArray)
}

module.exports = {
  nonExistingId,
  blogsInDb,
  getSingleTestBlog,
  usersInDb,
  getValidUserId,
  addHashedPasswordsToUsers,
  getSingleTestUser,
  generateTestToken,
  decodeTestUserToken
}