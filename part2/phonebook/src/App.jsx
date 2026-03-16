import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'
import NotificationError from './components/NotificationError'
import './index.css'

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
  const [newAddedMessage, setNewAddedMessage] = useState(null)
  const [newErrorMessage, setNewErrorMessage] = useState(null)

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
  const isRepeated = persons.some(person => person.name.toLowerCase() === newName.toLowerCase());
  if (isRepeated) {
    const personRepeated = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())[0];
    console.log(personRepeated)
     if (window.confirm(`${newName} is already added to the phonebook replace the old number with a new one?`)) {
      return(
    personService
    .update(personRepeated.id, personObject)
    .then(returnedPerson => {      
      console.log(returnedPerson)
      setPersons(persons.map(p => p.id === personRepeated.id ? returnedPerson : p)) 
      setNewAddedMessage(`${returnedPerson.name} successfully edited`)
      setTimeout(() => {          
        setNewAddedMessage(null)        
      }, 5000)   
      }
        ))
      }
      else{
        console.log("Not updating ID ", personRepeated.id)
      }
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
      setNewAddedMessage(`${returnedPerson.name} successfully added`)
      setTimeout(() => {          
        setNewAddedMessage(null)        
      }, 5000) 
      setNewName('')
    setNewNumber('')})
    .catch(error => {
      // this is the way to access the error message
      setNewErrorMessage(error.response.data.error)
    })
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
      })
    .catch(error => {
        setNewErrorMessage(          
          `Person '${props.name}' was already removed from server`        
        )        
        setTimeout(() => {          
          setNewErrorMessage(null)        
        }, 5000)        
        setPersons(persons.filter(p => p.id !== props.id)) 
      })
  )
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
      <Notification message={newAddedMessage}/>
      <NotificationError message={newErrorMessage}/>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h3>Add a new person</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNoteChange={handleNoteChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsFiltered={personsFiltered} deletePerson={deletePerson}/>
    </div>
  )
}

export default App

