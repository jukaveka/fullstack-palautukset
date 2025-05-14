const loginRouter = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const tokenUtil = require("../utils/token")

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body

  if (!( username && password )) {
    response.status(400).json({ error: "Username and password required "})
  }

  const user = await User.findOne({ username: username})

  const correctPassword = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && correctPassword)) {
    response.status(401).json({ error: "Username or password is incorrect "})
  }

  const token = tokenUtil.generateJwtToken(user)

  response
    .status(200)
    .send({ 
      token,
      username: user.username,
      name: user.name
    })
})

module.exports = loginRouter