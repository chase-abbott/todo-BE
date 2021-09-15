const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String
})

// userSchema.statics.login = function login({ username, password }) {
//   // find a matching user
//   const matchingUser = mongoose.model('Users').find({ username })
//   // confirm that there is a matching username and password
//   if (matchingUser) {
//     //bcrypt.compare
//   } else {
//     throw new Error('Invalid Username or Password')
//   }
//   //if there is, apply the token
//   // else throw an error
// }

// userSchema.statics.signup = async function signup({ username, password }) {
//   // finds a matching user
//   try {
//     const matchingUser = await mongoose.model('Users').findOne({ username })
//     console.log(matchingUser)
//     // if there is, throw an error
//     if (matchingUser) {
//       throw new Error('Username already exists.')
//     }
//     // if not, add to the database and apply a token
//     const passwordHash = bcrypt.hash(password, process.env.SALT)
//     const newUser = await mongoose.model('Users').create({ username, passwordHash })
//     return newUser
//   }
//   catch (err) {
//     console.log(err)
//   }
// }



module.exports = userSchema;