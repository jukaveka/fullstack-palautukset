const userRouter = require("express").Router()
const userService = require("../services/userService")

userRouter.get("/", async (request, response) => {
  const users = await userService.fetchAllUsers()

  response.json(users)
})

userRouter.post("/", async (request, response, next) => {
  const validatedRequest = await userService.validateUserPostRequest(request.body)

  if (validatedRequest.invalidRequest) {
    return response.status(validatedRequest.status).json({ error: validatedRequest.error })
  }

  const newUser = await userService.generateNewUser(request.body)

  const addedUser = await userService.saveUser(newUser)

  response.status(201).json(addedUser)
})

module.exports = userRouter