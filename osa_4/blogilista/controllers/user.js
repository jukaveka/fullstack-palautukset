const userRouter = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")

userRouter.post("/", async (request, response ) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username: username,
    name: name,
    passwordHash: passwordHash
  })

  const addedUser = await newUser.save()

  response.json(addedUser)
})

module.exports = userRouter