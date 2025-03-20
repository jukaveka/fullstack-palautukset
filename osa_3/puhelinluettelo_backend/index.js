const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

morgan.token('body', function (request, response) { return JSON.stringify(request.body) })
const morganTiny = morgan('tiny')
const morganExtended = morgan(`:method :url :status :res[content-length] - :response-time ms :body`)

const requestLogger = (request, response, next) => {
  if (request.method !== 'POST') {
    morganTiny(request, response, next)
  } else {
    morganExtended(request, response, next)
  }
  next()
}

app.use(requestLogger)

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
]

const generateId = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

app.get('/info', (request, response) => {
  const info = `Phonebook has info for ${persons.length} persons`
  const date = new Date()

  response.send(`${info} <br> <br> ${date}`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const personId = request.params.id

  const person = persons.find(person => person.id === personId)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }

})

app.delete('/api/persons/:id', (request, response) => {
  const personId = request.params.id

  persons = persons.filter(person => person.id !== personId)

  response.status(204).end()
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

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})