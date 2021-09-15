const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String
})

userSchema.statics.login = function login({ username, password }) {
  // find a matching user
  const matchingUser = mongoose.model('User').find({ username })
  // confirm that there is a matching username and password
  if (matchingUser) {
    //bcrypt.compare
  } else {
    throw new Error('Invalid Username or Password')
  }
  //if there is, apply the token
  // else throw an error
}

userSchema.statics.signup = function signup({ username, password }) {
  // finds a matching user
  // if there is, throw an error
  // if not, add to the database and apply a token
}

const User = mongoose.model('User', userSchema)

module.exports = User;