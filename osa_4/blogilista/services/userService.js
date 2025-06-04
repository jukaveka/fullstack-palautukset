const User = require("../models/user")
const hashUtil = require("../utils/hash")
const blogService = require("../services/blogService")

const fetchAllUsers = async () => {
  const users = await User
    .find({})
    .populate("blogs", { url: 1, title: 1, author: 1 })

  return users
}

const findUser = async (id) => {
  return await User.findById(id)
}

const saveUser = async (user) => {
  return await user.save()
}

const generateNewUser = async (requestBody) => {
  const passwordHash = await hashUtil.generatePasswordHash(requestBody.password)

  const newUser = new User({
    username: requestBody.username,
    name: requestBody.name,
    passwordHash: passwordHash
  })

  return newUser
}

const removeBlogFromUser = async (blogId, userId) => {
  const user = await findUser(userId)

  const removedBlogIndex = user.blogs.findIndex((blog) => blog._id.toString() === blogId)

  user.blogs = user.blogs.toSpliced(removedBlogIndex, 1)

  await saveUser(user)
}

const validateUsernameExistence = async (username) => {
  const usersWithUsername = await User.countDocuments({ username: username })

  return usersWithUsername > 0
}

const validateInputLength = (input, minLength) => {
  return input.length >= minLength
}

module.exports = {
  fetchAllUsers,
  findUser,
  generateNewUser,
  saveUser,
  removeBlogFromUser,
  validateUsernameExistence,
  validateInputLength
}