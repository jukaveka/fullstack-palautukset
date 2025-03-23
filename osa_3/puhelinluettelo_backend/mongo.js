const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log("Give your password as parameter if you want to check phonebook contents.")
  console.log("Give your password, name of a person and number of a person to add new entry to phonebook")

  process.exit(1)
}

process.argv.forEach(arg => {
  console.log(arg)
})

const password = process.argv[2]
const url = `mongodb+srv://juhokavekari:${password}@cluster0.11wdg.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

console.log("Connecting to MongoDB database with mongoose, connection string", url)

mongoose.set('strictQuery', false)
mongoose.connect(url)

console.log("Creating schema for person")

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

console.log("Generating model for person document")

const Person = new mongoose.model("Person", personSchema)

if (process.argv.length === 5) {
  console.log("Command array has three extra arguments. Generating object for new person")

  const newPerson = {
    name: process.argv[3],
    number: process.argv[4]
  }

  console.log("New person object", newPerson)

  const person = new Person(newPerson)

  console.log("Person document generated", person)

  person.save(person).then(response => {
    console.log(`Added ${person.name} number ${person.number} to phonebook`)

    console.log("Closing connection to MongoDB")
    mongoose.connection.close()
  })

} else if (process.argv.length === 3) {
  console.log("Command has 1 argument. Fetching phonebook contents")

  Person.find({}).then(response =>{
    console.log("")
    console.log("phonebook:")

    response.forEach(person => {
      console.log(person.name, person.number)
    })
    
    console.log("")
    console.log("Closing connectiong to MongoDB")
    mongoose.connection.close()
  })
}