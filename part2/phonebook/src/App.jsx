import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Person = ({ person, deletePerson }) => {
  return <li>{person.name} {person.number} <button onClick={() => deletePerson(person)}>Delete</button></li>
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
    props.personsFiltered.map((person, i) => (<Person key={i} person={person} deletePerson={props.deletePerson}/>))
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
  console.log('effect')
  personService
    .getAll()
    .then(
      response => {
      console.log('promise fulfilled')
      setPersons(response)
    })
}, [])
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
    personService
    .create(personObject)
    .then(returnedPerson => {      
      console.log(returnedPerson)
      setPersons(persons.concat(returnedPerson))      
      setNewName('')
    setNewNumber('')})
  ;}
}

const deletePerson = (props) =>
{console.log(props)
  if (window.confirm("Do you want to delete person " + props.name)) {return(
    personService
    .deleteId(props.id)
    .then(returnedPerson => {      
      console.log(returnedPerson)
      setPersons(persons.filter(p => p.id !== props.id))    
      }
  ))
}
else{
  console.log("Not deleting ID ", props)
}}
  console.log(persons)
  const personsFiltered = persons.filter(person => String(person.name.toLowerCase()).startsWith(newFilter.toLowerCase()))
  console.log(personsFiltered)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h3>Add a new person</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNoteChange={handleNoteChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsFiltered={personsFiltered} deletePerson={deletePerson}/>
    </div>
  )
}

export default App

