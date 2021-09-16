
const { User, Todo } = require('../connection.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
    user: (_, { username }) => {
      return new Promise((resolve, reject) => {
        User.findOne({ username }, (err, user) => {
          if (err) reject(err)
          else resolve(user)
        })
      })
    },
    viewer: (_, __, { user, isAuth }) => {
      console.log(isAuth)
      if (!isAuth) throw new Error('Not Authorized')
      const session = user.split('Bearer')[1].trim()
      const payload = jwt.verify(session, process.env.SECRET, function (err, decoded) {
        if (err) {
          return;
        }
        return decoded
      }
      );
      if (!payload) throw new Error('Not Authorized')

      return new Promise((resolve, reject) => {
        User.findOne({ _id: payload.user._id }, (err, user) => {
          if (err) reject(err)
          else resolve(user)
        })
      })
    },
    todos: (_, __, { userId, isAuth }) => {
      if (!isAuth || !userId) throw new Error("Not Authorized")
      return new Promise((resolve) => {
        resolve(Todo.find({ userId }))
      })
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
              else {
                results
                  ? resolve(jwt.sign({ user }, process.env.SECRET, { algorithm: 'HS256', expiresIn: '1d' }))
                  : reject('Incorrect Username or Password')
              }
            })
          }
        })
      })
    },
    signup: (_, args) => {
      return new Promise((resolve, reject) => {
        User.findOne({ username: args.username }, (err, user) => {

          if (user) {
            reject('Username already exists')
          }

          bcrypt.genSalt(Number(process.env.SALT), (err, salt) => {
            bcrypt.hash(args.password, salt)
              .then(passwordHash => {
                User.create({ username: args.username, passwordHash: passwordHash })
                resolve(jwt.sign({ user }, process.env.SECRET, { algorithm: 'HS256', expiresIn: '1d' }))
              })
          })

        })
      })

    },
    addTodo: (_, { content }, { userId, isAuth }) => {
      if (!isAuth || !userId) throw new Error("Not Authorized")
      return new Promise((resolve) => {
        resolve(Todo.create({ userId, content, completed: false }))
      })
    },
    completeTodo: (_, { _id }, { userId, isAuth }) => {
      if (!isAuth || !userId) throw new Error('Not Authorized')
      return new Promise(resolve => {
        resolve(Todo.findOneAndUpdate({ _id, userId }, { completed: true }, { new: true }))
      })
    }
  }
}

module.exports = resolvers;