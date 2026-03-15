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

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    personsFiltered = persons.find(person => person.id === id)
      if (personsFiltered) {    
        response.json(personsFiltered)  
    } else {    
        response.status(404).end()  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id != id)
  response.status(204).end()
})

app.get('/info', (request, response) => {
    const personLength = persons.length
    const currentDate = new Date();
    const stringResponse = `<p>Phonebook has info for ${personLength} people</p>
    <p>${currentDate.toString()}</p>
    `;
    
  
    response.send(stringResponse)

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})