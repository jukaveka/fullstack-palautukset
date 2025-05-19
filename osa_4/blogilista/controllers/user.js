const userRouter = require("express").Router()
const User = require("../models/user")
const hashUtil = require("../utils/hash")

const isInputLengthValid = (input, minLength) => {
  return input.length >= minLength
}

userRouter.get("/", async (request, response) => {
  const users = await User
    .find({})
    .populate("blogs", { url: 1, title: 1, author: 1 })

  response.json(users)
})

userRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body
  const usernameExists = await User.findOne({ username: username })

  if (!isInputLengthValid(username, 3) || !isInputLengthValid(password, 3)) {
    return response.status(400).json({ error: "Username and password must be at least 3 characters" })
  } else if (usernameExists) {
    return response.status(400).json({ error: "Username already exists" })
  } else {
    const passwordHash = await hashUtil.generatePasswordHash(password)

    const newUser = new User({
      username: username,
      name: name,
      passwordHash: passwordHash
    })

    const addedUser = await newUser.save()

    response.status(201).json(addedUser)
  }
})

module.exports = userRouter