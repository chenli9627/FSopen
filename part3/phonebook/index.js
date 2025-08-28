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
// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }

// morgan.token('type', function (req, res) { return req.headers['content-type'] })
morgan.token('body', (req, res) => {
  const body = JSON.stringify(req.body)
  // console.log('morgan body:', body)
  return body
})

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
// app.use(requestLogger)

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

const checkDuplicatedName = (name) => {
  return persons.find(person => person.name === name) || false
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  // console.log('the name is', body.name)
  if (!body.name) {
    // 400 Bad Request
    return response.status(400).json({ error: 'name missing' })
  }
  if (!body.number) {
    return response.status(400).json({ error: 'number missing' })
  }
  if (checkDuplicatedName(body.name)) {
    return response.status(409).json({ error: 'name must be unique' })
  }
  const person = {
    id: String(getRandomIntInclusive(persons.length, 99999)),
    name: body.name,
    number: body.number,
  }
  persons = persons.concat(person)
  response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const now = new Date()
  response.send(
    `
    <div>
      <p >Phonebook has info for ${persons.length} people</p>
      <p>${now.toString()}</p>
    </div>
  `)
})


const unKnownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unKnownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
