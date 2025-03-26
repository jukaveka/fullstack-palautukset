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

app.delete('/api/persons/:id', (request, response) => {
  const personId = request.params.id

  persons = persons.filter(person => person.id !== personId)

  return response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number missing. Both are required for adding new person"
    })
  }

  if (persons.map(person => person.name.toLowerCase()).includes(body.name.toLowerCase())) {
    return response.status(400).json({
      error: "The person you're adding already exists in phonebook."
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(5, 100).toString()
  }

  persons = persons.concat(person)

  return response.json(person)
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})