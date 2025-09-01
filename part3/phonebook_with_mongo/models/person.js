const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  // .then(result => {
  //   console.log('connected to MongoDB');
  // })
  .catch(error => {
    console.log('error connectiog to MongoDB', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    unique: true,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: [true, 'number is required'],
    validate: {
      validator: value => /^\d{2,3}-[0-9]+$/.test(value),
      message: props => `${props.value} is not a valid number.`,
    },
  },
  // Name: String,
  // number: String,
});

personSchema.set('toJSON', {
  transform(document, returnedObject) {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

module.exports = mongoose.model('Person', personSchema);
