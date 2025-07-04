const bcrypt = require("bcrypt")

const generatePasswordHash = async (password) => {
  const saltRounds = 10
  
  return await bcrypt.hash(password, saltRounds)
}

module.exports = { generatePasswordHash }