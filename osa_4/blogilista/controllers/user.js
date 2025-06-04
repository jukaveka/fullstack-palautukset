const userRouter = require("express").Router()
const userService = require("../services/userService")

const generateErrorResponseObject = (status, message) => {
  return {
    invalidRequest: true,
    status: status,
    error: message
  }
}

const validResponseObject = { invalidRequest: false }

const validateUserPostRequest = async (requestBody) => {
  if (!userService.validateInputLength(requestBody.username, 3)) {
    return generateErrorResponseObject(400, "Username must be at least 3 characters")
  }

  if (!userService.validateInputLength(requestBody.password, 3)) {
    return generateErrorResponseObject(400, "Password must be at least 3 characters")
  }

  const usernameExists = await userService.validateUsernameExistence(requestBody.username)

  if (usernameExists) {
    return generateErrorResponseObject(400, "Username already exists")
  }

  return validResponseObject
}

userRouter.get("/", async (request, response) => {
  const users = await userService.fetchAllUsers()

  response.json(users)
})

userRouter.post("/", async (request, response, next) => {
  const validatedRequest = await validateUserPostRequest(request.body)

  if (validatedRequest.invalidRequest) {
    return response.status(validatedRequest.status).json({ error: validatedRequest.error })
  }

  const newUser = await userService.generateNewUser(request.body)

  const addedUser = await userService.saveUser(newUser)

  response.status(201).json(addedUser)
})

module.exports = userRouter