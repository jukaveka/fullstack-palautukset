require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const Person = require("./modules/person")

const app = express()
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', function (request, response) { return JSON.stringify(request.body) })
const morganTiny = morgan('tiny')
const morganExtended = morgan(`:method :url :status :req[content-length] - :response-time ms :body`)

const requestLogger = (request, response, next) => {
  if (request.method !== "POST") {
    morganTiny(request, response, next)
  } else {
    morganExtended(request, response, next)
  }
}

app.use(requestLogger)


app.get('/info', (request, response) => {
  Person
    .countDocuments({})
    .then(documentCount => {
      const info = `Phonebook has info for ${documentCount} persons`
      const date = new Date()

      return response.send(`${info} <br> <br> ${date}`)
    })

})

app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then(teams => {
      return response.json(teams)
    })
})

app.get('/api/persons/:id', (request, response) => {
  const personId = request.params.id

  const person = persons.find(person => person.id === personId)

  if (person) {
    return response.json(person)
  } else {
    return response.status(404).end()
  }

})

app.delete('/api/persons/:id', (request, response, next) => {
  Person
    .findByIdAndDelete(request.params.id)
    .then(deletedPerson => {
      console.log("Person deleted from database", deletedPerson)
      return response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons/', (request, response) => {
  const body = request.body

  console.log("Confirming that request body contains necessary values")

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number missing. Both are required for adding new person"
    })
  }

  console.log("Generating new document based on request body")

  const newPerson = new Person({
    name: body.name,
    number: body.number
  })

  console.log("Document generated", newPerson)
  console.log("Storing generated document to database collection")

  newPerson
    .save()
    .then(savedPerson => {
      console.log("Person saved to database", savedPerson)
      response.json(savedPerson)
    })
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({error: "Issues with format of provided ID"})
  }
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})