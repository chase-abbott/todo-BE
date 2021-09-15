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

  #Returns all of a user's todos
  todo(username: String!): [Todo!]!
}

#Mutations
  type Mutation {
    login(username: String!, password: String!): User!
    signup(username: String!, password: String!): User!
    addTodo(userId: String!, content: String!): Todo!
  }
`

module.exports = typeDefs