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

console.log("Creating validator for phone numbers")

const phoneNumberValidator = (value) => {
  return /\d{2,3}-\d{5,}/.test(value)
}

console.log("Generating person schema")

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: phoneNumberValidator,
      message: "Phone number must start with 2-3 digits, followed with '-', followed with 5+ digits"
    }
  }
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