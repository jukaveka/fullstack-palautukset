const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String
})

userSchema("toJSON", () => {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.Model("User", userSchema)