const express = require('express')

require('dotenv').config()

const app = express()
const morgan = require('morgan');
const cors = require('cors')
const Person = require('./models/person')
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



app.get('/api/persons', (request, response) => {
  Person.find({}).then(notes => {
    response.json(notes)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name || !body.number) {
  return response.status(400).json({ 
    error: 'Name or Number missing' 
  })
}
  // const listOfNames = persons.map(person => person.name.toLowerCase())
  // if (listOfNames.includes(body.name.toLowerCase())) {
  //   return response.status(400).json({ 
  //   error: 'Name already exists in database, name must be unique' 
  // })
  // }
  // console.log(listOfNames)
  const person = new Person({
      name: body.name,
      number: body.number
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {        
        response.json(person)      
      } else {        
        response.status(404).end()      
      }    })
        .catch(error => next(error))})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.get('/info', async (request, response, next) => {
    try {
    // Use countDocuments() for an accurate count of a specific query
    const personLength = await Person.countDocuments({});
    console.log("Number of docs: ", personLength);
    const currentDate = new Date();
    const stringResponse = `<p>Phonebook has info for ${personLength} people</p>
    <p>${currentDate.toString()}</p>
    `;
    response.send(stringResponse)
      } catch (err) {
          console.error(error => next(error));
      }
})


app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})