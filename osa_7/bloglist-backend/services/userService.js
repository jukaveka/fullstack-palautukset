const User = require("../models/user")
const hashUtil = require("../utils/hash")
const validatorService = require("../services/requestValidatorService")

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

// Request validation functions

const validateUsernameExistence = async (username) => {
  const usersWithUsername = await User.countDocuments({ username: username })

  return usersWithUsername > 0
}

const validateInputLength = (input, minLength) => {
  return input.length >= minLength
}

const validateUserPostRequest = async (requestBody) => {
  if (!validateInputLength(requestBody.username, 3)) {
    return validatorService.generateInvalidRequestObject(400, "Username must be at least 3 characters")
  }

  if (!validateInputLength(requestBody.password, 3)) {
    return validatorService.generateInvalidRequestObject(400, "Password must be at least 3 characters")
  }

  const usernameExists = await validateUsernameExistence(requestBody.username)
  if (usernameExists) {
    return validatorService.generateInvalidRequestObject(400, "Username already exists")
  }

  return validatorService.generateValidRequestObject()
}

module.exports = {
  fetchAllUsers,
  findUser,
  generateNewUser,
  saveUser,
  removeBlogFromUser,
  validateUserPostRequest
}