import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  // const [persons, setPersons] = useState([
  //   // { name: 'Arto Hellas', number: '040-123456', id: 1 },
  //   // { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  //   // { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  //   // { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  // ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationState, setNotificationState] = useState(false)
  const [message, setMessage] = useState('')
  const [greenOrBlue, setGreenOrBlue] = useState(true)


  const sendMessage = async (msg, gorB) => {
    setNotificationState(true)
    setMessage(msg)
    setTimeout(() => {
      setNotificationState(false)
      setMessage('')
      setGreenOrBlue(true)
    }, 3000)
  }

  useEffect(() => {
    console.log('get all persons')
    personsService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = async (event) => {
    event.preventDefault()
    const duplicatedPerson = persons.find(person => person.name === newName)

    const resetForm = () => {
      setNewName('');
      setNewNumber('');
    };

    if (duplicatedPerson) {
      if (confirm('Duplicated name, you want to update the corresponding number?', true)) {

        const updateop = () => {
          console.log('update', newName)
          const newObject = { number: newNumber, name: newName }
          personsService.updateOnePerson(duplicatedPerson.id, newObject).then(returnedObject => {
            // console.table(returnedObject.data)
            setPersons(persons.map(person =>
              person.name === returnedObject.data.name ? returnedObject.data : person
            ))
          }).then(() => {
            sendMessage(`Updated ${newName}`)
            resetForm()
          })
        }
        updateop()

      }
    } else {
      const addop = () => {

        // const newId = (Math.max(...persons.map(person => person.id)) + 1).toString()
        console.log('add', newName)
        const newObject = { name: newName, number: newNumber }
        // const newObject = { name: newName, number: newNumber, id: newId }

        personsService.create(newObject).then(returnedObject => setPersons(persons.concat(returnedObject)))
          .then(() => {
            sendMessage(`Added ${newName}`)
            resetForm()
          })
          .catch(err => {
            console.log(err.response.data.error)
            setGreenOrBlue(false)
            sendMessage(err.response.data.error)
          })
        // setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1 }))
        // console.log('Add person', newName, newNumber, persons.length + 1)
      }
      addop()

    }
  }

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

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notificationState={notificationState} message={message} greenOrBlue={greenOrBlue} />
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson} />
    </div>
  )
}



export default App
