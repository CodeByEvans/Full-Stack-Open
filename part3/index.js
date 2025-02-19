require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

// Middlewares
app.use(express.static('dist'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Cargar los logs en la consola
app.use(morgan('tiny'))

morgan.token('body', function (request) {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }
  return ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

// Rutas, requests y respuestas
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      next(error)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const { name, number } = request.body

  const updatedPerson = {
    name,
    number
  }

  Person.findByIdAndUpdate(id, updatedPerson, { new: true, runValidators: true, context: 'query' })
    .then(result => {
      if (result) {
        response.json(result)
      } else {
        response.status(404).send({ error: 'person not found' })
      }
    })
    .catch(error => {
      console.log(error)
      next(error)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findByIdAndDelete(id)
    .then(result => {
      if (result) {
        response.status(204).end()
      } else {
        response.status(404).send({ error: 'person not found' })
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'falta el nombre o numero'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => {
      next(error)
    })
})

app.get('/info', (request, response) => {
  Person.find({})
    .then(persons => {
      const requestTime = new Date()
      const numbOfEntries = persons.length
      response.send(`
        <p>Phonebook has info for ${numbOfEntries} people</p>
        <br/>
        <p>${requestTime}</p>
      `)
    })
})

const errorHandler = (error, request, response) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  response.status(500).send({ error: 'Internal Server Error' })
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
