const Persons = ({ persons, newFilter, deletePerson }) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  // console.table(filteredPersons)
  return (
    <div>
      {filteredPersons.map((person) =>
        <p key={person.id} >
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </p>
      )}
    </div>
  )

}
export default Persons
