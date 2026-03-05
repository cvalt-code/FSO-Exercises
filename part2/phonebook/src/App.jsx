import { useState } from 'react'

const Person = ({ person }) => {
  return <li>{person.name} {person.number}</li>
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' ,
      number: '666-312-2133'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNoteChange = (event) => {    
  console.log(event.target.value)    
  setNewName(event.target.value)  }

  const handleNumberChange = (event) => {    
  console.log(event.target.value)    
  setNewNumber(event.target.value)  }

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNoteChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, i) => (<Person key={i} person={person}/>))}
    </div>
  )
}

export default App

