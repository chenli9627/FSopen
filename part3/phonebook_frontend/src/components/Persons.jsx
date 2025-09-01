// const Persons = ({ persons, newFilter, deletePerson }) => {
//   // const filteredPersons = persons.filter(person => person.name.toString().includes(newFilter.toLowerCase()))
//   // const filteredPersons = persons.filter((item) => {
//   //   item.name.toString().toLowerCase().includes(newFilter.toString().toLowerCase());
//   //
//   // })
//
//   // const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
//   // 避免重复计算 toLowerCase()
//   const filterText = (newFilter || '').toLowerCase();
//   const filteredPersons = persons.filter(person =>
//     person.name && person.name.toLowerCase().includes(filterText)
//   );
//
//
//   return (
//     <div>
//       {filteredPersons.map(person => {
//         <p key={person.id}>
//           {person.name} {persons.number}
//           <button onClick={() => deletePerson(person.id)}>delete</button>
//         </p>
//       })}
//     </div>
//   )
// }
//
// export default Persons


const Persons = ({ persons, newFilter, deletePerson }) => {
  const filteredPersons = (Array.isArray(persons) ? persons : [])
    .filter(person =>
      (person?.name || '')
        .toLowerCase()
        .includes((newFilter || '').toLowerCase())
    );
  // const filteredPersons = persons.filter(person => (person?.name || '').toLowerCase().includes(newFilter.toLowerCase()))
  // console.log(typeof (persons))
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
