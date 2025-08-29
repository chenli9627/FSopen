const express = require('express')
const morgan = require('morgan')

const app = express()

let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

morgan.token('body', (req) => {
  const body = JSON.stringify(req.body)
  return body
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

function getRamdomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

const checkDuplicatedName = (name) => {
  return persons.find(person => person.name === name) || false
}

app.get('/api/persons', (req, res) => {
  response.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.id
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404), end()
  }
})

app.get('/info', (req, res) => {
  const now = new Date()
  res.send(
    `
    <div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${now.toString()}</p>
    </div>
    `
  )
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name) {
    // 400 bad request
    return response.status(400).json({ error: 'name missing' })
  }
  if (!body.number) {
    return response.status(400).json({ error: 'number missing' })
  }
  if (checkDuplicatedName(body.naem)) {
    return response.status(409).json({ error: 'name must be unique' })
  }
  const person = {
    id: String(getRamdomIntInclusive(persons.length, 99999)),
    name: body.name,
    number: body.number,
  }
  persons = persons.concat(person)
  response.json(person)
})

const unKnownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unKnownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
