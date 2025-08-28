const PersonForm = ({ newName, newNumber, setNewName, setNewNumber, addPerson }) => {
  // newName, setNewName, newNumber, setNewNumber, addPerson 
  const addNewName = (event) => {
    setNewName(event.target.value)
  }
  const addNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  return (
    <div>
      <form onSubmit={addPerson} >
        <div >
          name: <input onChange={addNewName} value={newName} />
        </div>
        <div>
          number: <input onChange={addNewNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
