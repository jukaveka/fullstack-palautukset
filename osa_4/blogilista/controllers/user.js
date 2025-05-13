const userRouter = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")

const isInputLengthValid = (input, minLength) => {
  return input.length >= minLength
}

userRouter.get("/", async (request, response) => {
  const users = await User
    .find({})
    .populate("blogs", { url: 1, title: 1, author: 1})

  response.json(users)
})

userRouter.post("/", async (request, response ) => {
  const { username, name, password } = request.body

  if (!( isInputLengthValid(username, 3) && isInputLengthValid(password, 3) )) {
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