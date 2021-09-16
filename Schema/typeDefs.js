const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
  _id: String!
  username: String!
}

type Todo {
  _id: String!
  userId: String!
  content: String!
  completed: Boolean!
}

#Queries
#Where all of our queries in our application live
type Query {
  #Returns a list of users
  getAllUsers: [User!]!

  #getMatchingUser
  user(username: String!): User

  #Returns all of the logged in user's todos
  todos: [Todo!]!

  viewer: User
}

#Mutations
  type Mutation {
    login(username: String!, password: String!): String
    signup(username: String!, password: String!): String
    addTodo(content: String!): Todo!
    completeTodo(_id: String!): Todo!
    deleteTodo(_id: String!): Todo
  }
`

module.exports = typeDefs