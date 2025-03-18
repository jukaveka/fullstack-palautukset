const express = require("express")
const app = express()

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

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const personId = request.params.id

  persons = persons.filter(person => person.id !== personId)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})