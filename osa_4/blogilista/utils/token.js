const jwt = require("jsonwebtoken")

const generateJwtToken = async (user) => {
  const userForToken = {
    username: user.username,
    id: user._id || user.id
  }

  return jwt.sign(userForToken, process.env.SECRET)
}

module.exports = { generateJwtToken }