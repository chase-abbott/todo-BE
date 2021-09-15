const users = require('../data.js')
const { User } = require('../connection.js')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()

const resolvers = {
  Query: {
    getAllUsers: () => {
      //return data from mongoDB 
      //schema.find
      return users;
    },
    user: (_, args) => {
      console.log(args)
      return users.find(user => user.username == args.username)
    }
  },
  Mutation: {
    login: (_, args) => {
      args.passwordHash = args.password;
      delete args.password;
      const newUser = args;
      users.push(newUser)
      return newUser;
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