import { useEffect, useState } from 'react'
// import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '040-123456', id: 1 },
    // { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    // { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    // { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationState, setNotificationState] = useState(false)
  const [message, setMessage] = useState('')


  const sendMessage = async (msg) => {
    setNotificationState(true)
    setMessage(msg)
    setTimeout(()=>{
      setNotificationState(false)
      setMessage('')
    },3000)
  }

  useEffect(() => {
    console.log('effect')
    personsService.getAll().then(initialPersons => setPersons(initialPersons))
    // axios.get('http://localhost:3001/persons')
    //   .then((response) => {
    //     console.log('promise fullfilled')
    //     setPersons(response.data)
    //   })
  }, [])
  // console.log('render', persons.length, 'notes')

  /*   const checkDuplicated = () => {
      // const a = persons.filter(item => item.name == newName)
      for (let person of persons) {
        if (person.name === newName)
          return true
      }
      return false
    } */
  const addPerson = async (event) => {
    event.preventDefault()
    // const newObject = { name: newName, number: newNumber, id: (persons.length + 1).toString() }
    // if (checkDuplicated()) {
    //   // alert(`${newName} is already added to phonebook`)
    //   const isTrue = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
    //   if (isTrue) {
    //     const personToDelete = persons.find(person => person.name == newName)
    //     console.log(`to delete duplicated person id ${personToDelete.id}`)
    //     await deletePerson(personToDelete.id)
    //     // setPersons(persons.filter(person => person.id !== personToDelete.id))
    //     // setPersons(persons.filter((person) => person.id !== personToDelete.id));
    //   } else { return }
    // }
    const addop = async () => {
      const newId = (Math.max(...persons.map(person => person.id)) + 1).toString()
      console.log('add', newId)
      const newObject = { name: newName, number: newNumber, id: newId }

      personsService.create(newObject).then(returnedObject => setPersons(persons.concat(returnedObject)))
      // setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1 }))
      // console.log('Add person', newName, newNumber, persons.length + 1)
      sendMessage(`Added ${newName}`)
      setNewName('')
      setNewNumber('')
    }
    await addop()
  }

  // const deletePerson = (id) => {
  //   const targetPerson = persons.find(person => person.id === id)
  //   const isTrue = confirm(`Delete ${targetPerson.name} ?`, true)
  //   if (isTrue) {
  //     const response = personsService.deleteOnePerson(id)
  //     response.then(response => {
  //       console.log('delete response', response)
  //       return response
  //     })
  //       .then(response => {
  //         console.log(`Persons reload on page, status: ${response.status}`)
  //         setPersons(persons.filter(person => person.id !== id))
  //       })
  //
  //   }
  // }
  const deletePerson = async (id) => {
    const targetPerson = persons.find((person) => person.id === id);
    if (!targetPerson) {
      console.error('id not found');
      return;
    }
    const isTrue = confirm(`Delete ${targetPerson.name}?`);
    if (isTrue) {
      try {
        const response = await personsService.deleteOnePerson(id);
        console.log('delete response', response);
        setPersons(persons.filter((person) => person.id !== id));
        console.log(`Persons reloaded, status: ${response.status}`);
        sendMessage(`Deleted ${targetPerson.name}`)
      } catch (error) {
        console.error('delete error:', error);
      }
    }
  };
  // const addNewName = (event) => {
  //   setNewName(event.target.value)
  // }
  // const addNewNumber = (event) => {
  //   setNewNumber(event.target.value)
  // }
  // const addNewFilter = (event) => {
  //   setNewFilter(event.target.value)
  // }
  // const DisplayPersons = () => {
  //   const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  //   console.table(filteredPersons)
  //   return (
  //     filteredPersons.map((person) => <p key={persons.indexOf(person)} >{person.name} {person.number}</p>)
  //   )
  // }

  return (
    <div>
      <h2>Phonebook</h2>
      {/* <form > */}
      {/*   <div> */}
      {/*     filter shown with<input onChange={addNewFilter} value={newFilter} /> */}
      {/*   </div> */}
      {/* </form> */}
      <Notification notificationState={notificationState} message={message} />
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} addPerson={addPerson} />
      {/* <form onSubmit={addPerson} > */}
      {/*   <div > */}
      {/*     name: <input onChange={addNewName} value={newName} /> */}
      {/*   </div> */}
      {/*   <div> */}
      {/*     number: <input onChange={addNewNumber} value={newNumber} /> */}
      {/*   </div> */}
      {/*   <div> */}
      {/*     <button type="submit">add</button> */}
      {/*   </div> */}
      {/* </form> */}
      <h2>Numbers</h2>
      {/* <DisplayPersons /> */}
      <Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson} />
    </div>
  )
}

export default App




