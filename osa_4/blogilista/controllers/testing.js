const testingRouter = require("express").Router()
const testingService = require("../services/testingService")

testingRouter.post("/reset", async (request, response, next) => {
  await testingService.clearUsers()
  await testingService.clearBlogs()

  response.status(204).end()
})

module.exports = testingRouter