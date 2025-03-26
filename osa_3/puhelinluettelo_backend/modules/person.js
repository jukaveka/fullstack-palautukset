const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false)

console.log("Connecting to", url)

mongoose
  .connect(url)
  .then(response => {
    console.log("Connection established to MongoDB")
  })
  .catch(error => {
    console.log("Connection failed", error.message)
  })

console.log("Generating person schema")

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

console.log("Transforming JSON-object of generated schema")

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

console.log("Exporting model based on person schema")

module.exports = mongoose.model("Person", personSchema)