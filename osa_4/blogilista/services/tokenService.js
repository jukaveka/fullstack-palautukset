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

const invalidToken = (token) => {
  const decodedToken = decodeJwtToken(token)

  return !decodedToken.id
}

module.exports = {
  generateJwtToken,
  decodeJwtToken,
  invalidToken
}