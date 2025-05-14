const jwt = require("jsonwebtoken")

const generateJwtToken = (user) => {
  const userForToken = {
    username: user.username,
    id: user._id || user.id
  }

  return jwt.sign(userForToken, process.env.SECRET)
}

const decodeJwtToken = (token) => {
  return jwt.verify(token, process.env.SECRET)
}

module.exports = {
  generateJwtToken,
  decodeJwtToken
}