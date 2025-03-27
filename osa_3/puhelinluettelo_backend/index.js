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

app.get('/info', (request, response, next) => {
  console.log("Fetching information of phonebook")

  Person
    .countDocuments({})
    .then(documentCount => {
      const info = `Phonebook has info for ${documentCount} persons`
      const date = new Date()

      return response.send(`${info} <br> <br> ${date}`)
    })
    .catch(error => next(error))

})

app.get('/api/persons', (request, response, next) => {
  console.log("Fetching all persons from phonebook")

  Person
    .find({})
    .then(teams => {
      console.log("All persons fetched from phonebook, documents fetched", teams.length)

      return response.json(teams)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  console.log("Fetching person by id", request.params.id)

  Person
    .findById(request.params.id)
    .then(person => {
      if (person) {
        return response.json(person)
      } else {
        return response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  console.log("Deleting of person with id", request.params.id)

  Person
    .findByIdAndDelete(request.params.id)
    .then(deletedPerson => {
      console.log("Person deleted from database", deletedPerson)
      return response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons/', (request, response, next) => {
  console.log("Adding new person to phonebook")

  const body = request.body

  console.log("Confirming that request body contains necessary values", request.body)

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
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  console.log("Updating person information, id", request.params.id)

  const {name, number} = request.body

  console.log("Confirming request body icludes required information")

  if (!name || !number) {
    console.log("Name or number missing from request body", name, number)

    return request.status(400).json({
      error: "Name or number missing. Both are required for adding new person"
    })
  }

  console.log("Fetching person to be updated from database")

  Person
    .findById(request.params.id)
    .then(person => {
      console.log("Person to be updated", person)

      person.name = name
      person.number = number

      console.log("Person with updated data", person)

      person
        .save()
        .then(updatedPerson => {
          console.log("Updated person successfully", updatedPerson)

          return response.json(updatedPerson)
        })
        .catch(error => next(error))
    })
})

const errorHandler = (error, request, response, next) => {
  console.log("Error while handling request", request)
  console.log("Error message", error.message)

  if (error.name === "CastError") {
    return response.status(400).send({error: "Issues with format of provided ID"})
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})