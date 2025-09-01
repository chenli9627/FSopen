require('dotenv').config()
const Person = require('./models/person.js')
const express = require('express')
const morgan = require('morgan')
const errorHandler = require('./error.js')

const app = express()

// let persons = []

morgan.token('body', (req) => {
  const body = JSON.stringify(req.body)
  return body
})



app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// function getRamdomIntInclusive(min, max) {
//   const minCeiled = Math.ceil(min)
//   const maxFloored = Math.floor(max)
//   return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
// }



app.get('/', (req, res) => {
  res.send(`<p>Hello<p/>`)
})

app.get('/api/persons', (req, res) => {
  // response.json(persons)
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (!person) {
        return res.status(404).end()
      }
      res.json(person)
    })
    .catch(error => {
      next(error)
    })
})

app.get('/info', (req, res) => {
  const now = new Date()
  Person.find({}).then(persons => {
    // const long = 0
    // persons.forEach(person => long++)
    res.send(
      `
    <div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${now.toString()}</p>
    </div>
    `
    )
  })
})

app.post('/api/persons', (request, response, next) => {

  const body = request.body
  Person.find({}).then(persons => {
    const checkResult = persons.find(person => person.name === body.name) || false
    console.log('checkDuplicatedName:\n', checkResult)
    if (checkResult) {
      // if (!body.name) {
      //   // 400 bad request
      //   return response.status(400).json({ error: 'name missing' })
      // }
      // if (!body.number) {
      //   return response.status(400).json({ error: 'number missing' })
      // }
      // console.log('post bad')
      return response.status(409).json({ error: 'name must be unique' })
    } else {
      // console.log('post good')
      const person = new Person({
        // id: String(getRamdomIntInclusive(persons.length, 99999)),
        name: body.name,
        number: body.number,
      })
      person.save().then(savedPerson => {
        response.json(savedPerson)
      }).catch(err => {
        response.status(400)
        next(err)
      })
      // persons = persons.concat(person)
      // response.json(person)
    }
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  Person.findById(request.params.id).then(person => {
    if (!person) {
      return response.status(404).end()
    }
    person.name = name
    person.number = number
    person.save().then(undatedPerson => {
      response.json(undatedPerson)
    })
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id).then(result => {
    res.status(204).end()
  })
    .catch(error => next())
})

const unKnownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unKnownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
