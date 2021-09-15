
const { User } = require('../connection.js')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()

const resolvers = {
  Query: {
    getAllUsers: () => {
      return new Promise((resolve, reject) => {
        User.find((err, users) => {
          if (err) reject(err)
          else resolve(users)
        })
      })
    },
    user: (_, args) => {
      console.log(args)
      return users.find(user => user.username == args.username)
    }
  },
  Mutation: {
    login: (_, args) => {
      return new Promise((resolve, reject) => {
        User.findOne({ username: args.username }, (err, user) => {

          if (err) {
            reject(err)
          }
          if (!user) {
            reject('Incorrect Username or Password')
          } else {
            bcrypt.compare(args.password, user.passwordHash, (err, results) => {

              if (err) reject('Incorrect Username or Password')
              results ? resolve(user) : reject('Incorrect Username or Password')
            })
          }
        })
      })
    },
    signup: async (_, args) => {
      return new Promise((resolve, reject) => {
        User.findOne({ username: args.username }, (err, user) => {

          if (user) {
            reject('Username already exists')
          }
          bcrypt.genSalt(Number(process.env.SALT), (err, salt) => {
            bcrypt.hash(args.password, salt)
              .then(passwordHash => {
                resolve(User.create({ username: args.username, passwordHash: passwordHash }))
              })
          })

        })
      })

    }
  }
}

module.exports = resolvers;