const userRouter = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")

const isUsernameValid = (username) => {
  return username.length >= 3
}

const isPasswordValid = (password) => {
  return password.length >= 3
}

userRouter.get("/", async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

userRouter.post("/", async (request, response ) => {
  const { username, name, password } = request.body

  if (!( isUsernameValid(username) && isPasswordValid(password) )) {
    response.status(400).json({ error: "Username and password must be at least 3 characters" })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username: username,
    name: name,
    passwordHash: passwordHash
  })

  const addedUser = await newUser.save()

  response.status(201).json(addedUser)
})

module.exports = userRouter