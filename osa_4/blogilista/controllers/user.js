const userRouter = require("express").Router()
const User = require("../models/user")
const hashUtil = require("../utils/hash")

const isInputLengthValid = (input, minLength) => {
  return input.length >= minLength
}

userRouter.get("/", async (request, response) => {
  const users = await User
    .find({})
    .populate("blogs", { url: 1, title: 1, author: 1})

  response.json(users)
})

userRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body

  console.log(username, "checking name and password length")

  if ( !isInputLengthValid(username, 3) || !isInputLengthValid(password, 3) ) {
    response.status(400).json({ error: "Username and password must be at least 3 characters" }).end()
  }

  console.log(username, "querying database for user ith same username")

  const usernameExists = await User.findOne({ username: username })

  console.log(username, "checking if user already exists")

  if ( usernameExists ) {
    response.status(400).json({ error: "Username already exists"}).end()
  }

  console.log(username, "generating password hash")

  const passwordHash = await hashUtil.generatePasswordHash(password)

  console.log(username, "generating new user from model")

  const newUser = new User({
    username: username,
    name: name,
    passwordHash: passwordHash
  })

  console.log(username, "saving generated user to database")

  const addedUser = await newUser.save()

  response.status(201).json(addedUser)
})

module.exports = userRouter