const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  user: mongoose.Schema.Types.ObjectId,
  likes: Number
})

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)