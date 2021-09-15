const users = require('../data.js')

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
    signup: (_, args) => {

    }
  }
}

module.exports = resolvers;