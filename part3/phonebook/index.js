const express = require('express')
const app = express()
const morgan = require('morgan');

app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name || !body.number) {
  return response.status(400).json({ 
    error: 'Name or Number missing' 
  })
}
  const listOfNames = persons.map(person => person.name.toLowerCase())
  if (listOfNames.includes(body.name.toLowerCase())) {
    return response.status(400).json({ 
    error: 'Name already exists in database, name must be unique' 
  })
  }
  console.log(listOfNames)
  const person = {
    id:String(Math.floor(Math.random() * 99999) + 1),
    name:body.name,
    number:body.number
  }

  persons = persons.concat(person)
  response.json(person)
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