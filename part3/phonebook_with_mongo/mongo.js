const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as an parameter')
  process.exit(1)
}

const password = process.argv[2]
const Url = `mongodb+srv://chen:${password}@cluster0.7sgpmax.mongodb.net/persons?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(Url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


const addPerson = (name, number) => {
  const person = new Person({
    name: name,
    number: number,
  })
  person.save().then(response => {
    console.log(`added ${response.name} number ${response.number} to phonebook`)
    mongoose.connection.close()
  })
}

const showPerson = () => {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => console.log(person.name, person.number))
    mongoose.connection.close()
  })
}

if (process.argv.length == 5) {
  addPerson(process.argv[3], process.argv[4])
} else if (process.argv.length == 3) {
  showPerson()
} else {
  mongoose.connection.close().then(
    () => console.log(`What do you want to do?`)
  )
}


