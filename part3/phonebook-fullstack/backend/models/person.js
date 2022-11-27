const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log(`Connecting to ${url}...`);
mongoose
  .connect(url)
  .then((result) => {
    console.log('Connected to MongoDB!');
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, 'Name required'],
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: (v) => {
        return /^\d{2,3}-\d{6,7}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number!`,
    },
    required: [true, 'Phone number required'],
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
