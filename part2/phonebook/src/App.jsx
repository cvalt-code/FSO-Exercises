import { useState } from 'react'

const Person = ({ person }) => {
  return <li>{person.name} {person.number}</li>
}

const Filter = (props) => {
  return <div>Filter shown with <input value={props.value} onChange={props.onChange}/></div>
}

const PersonForm = (props) => {
  return (
  <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.newName} onChange={props.handleNoteChange}/>
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
  </form>);

}

const Persons = (props) => {
  return (
    props.personsFiltered.map((person, i) => (<Person key={i} person={person}/>))
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNoteChange = (event) => {    
  console.log(event.target.value)    
  setNewName(event.target.value)  }

  const handleNumberChange = (event) => {    
  console.log(event.target.value)    
  setNewNumber(event.target.value)  }

  const handleFilterChange = (event) => {    
  console.log(event.target.value)    
  setNewFilter(event.target.value)  }

  const addPerson = (event) => {
  event.preventDefault()
  const personObject = {
    name: newName,
    number: newNumber,
  }
  const isRepeated = persons.some(person => person.name === newName);
  if (isRepeated) {
    alert(`${newName} is already added to the phonebook`)
    setNewName('');
    setNewNumber('');
    
  }
  else {
  console.log(personObject);
  
  setPersons(persons.concat(personObject))
  setNewName('')
  setNewNumber('');}
}

  const personsFiltered = persons.filter(person => String(person.name.toLowerCase()).startsWith(newFilter.toLowerCase()))
  console.log(personsFiltered)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h3>Add a new person</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNoteChange={handleNoteChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsFiltered={personsFiltered}/>
    </div>
  )
}

export default App

