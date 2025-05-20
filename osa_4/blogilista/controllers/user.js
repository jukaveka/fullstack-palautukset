const userRouter = require("express").Router()
const User = require("../models/user")
const hashUtil = require("../utils/hash")

const validateInputLength = (input, minLength) => {
  return input.length >= minLength
}

const fetchAllUsers = async () => {
  const users = await User
    .find({})
    .populate("blogs", { url: 1, title: 1, author: 1 })

  return users
}

const generateErrorResponseObject = (status, message) => {
  return {
    invalidRequest: true,
    status: status,
    error: message
  }
}

const validResponseObject = { invalidRequest: false }

const validateUsernameExistence = async (username) => {
  const usersWithUsername = await User.countDocuments({ username: username })

  return usersWithUsername > 0
}

const validateUserPostRequest = async (requestBody) => {
  if (!validateInputLength(requestBody.username, 3)) {
    return generateErrorResponseObject(400, "Username must be at least 3 characters")
  }

  if (!validateInputLength(requestBody.password, 3)) {
    return generateErrorResponseObject(400, "Password must be at least 3 characters")
  }

  const usernameExists = await validateUsernameExistence(requestBody.username)

  if (usernameExists) {
    return generateErrorResponseObject(400, "Username already exists")
  }

  return validResponseObject
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

userRouter.get("/", async (request, response) => {
  const users = await fetchAllUsers()

  response.json(users)
})

userRouter.post("/", async (request, response, next) => {
  const validatedRequest = await validateUserPostRequest(request.body)

  if (validatedRequest.invalidRequest) {
    return response.status(validatedRequest.status).json({ error: validatedRequest.error })
  }

  const newUser = await generateNewUser(request.body)

  const addedUser = await saveUser(newUser)

  response.status(201).json(addedUser)
})

module.exports = userRouter