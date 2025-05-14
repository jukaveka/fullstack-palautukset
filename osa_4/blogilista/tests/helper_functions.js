const Blog = require("../models/blog")
const User = require("../models/user")
const bcrypt = require("bcrypt")
const tokenUtil = require("../utils/token")

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

const getSingleTestUser = async () => {
  const user = await User.findOne({})

  return user.toJSON()
}

const generateTestUserToken = async () => {
  const user = await getSingleTestUser()

  return await tokenUtil.generateJwtToken(user)
}

const generateValidPasswordHash = async (password) => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  return passwordHash
}

const generateUserObjectWithHashedPassword = async (testUserObject) => {
  testUserObject.passwordHash = await generateValidPasswordHash(testUserObject.password)

  return testUserObject
}

const generateTestUsersWithHashedPasswords = async (testUserArray) => {
  const promiseArray = testUserArray.map(testUser => generateUserObjectWithHashedPassword(testUser))

  return await Promise.all(promiseArray)
}

module.exports = {
  nonExistingId,
  blogsInDb,
  getSingleTestBlog,
  usersInDb,
  getValidUserId,
  generateValidPasswordHash,
  generateTestUsersWithHashedPasswords,
  getSingleTestUser,
  generateTestUserToken
}