const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userSchema = require('./lib/models/User');
const todoSchema = require('./lib/models/Todo.js')
dotenv.config();


mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let db = mongoose.connection;
db.on('error', () => {
  console.error("Error while connecting to DB");
});
db.once('open', () => {
  console.log('we\'re connected!');
  // we're connected!
});


const User = mongoose.model('Users', userSchema)
const Todo = mongoose.model('Todo', todoSchema)

module.exports = { User, Todo }