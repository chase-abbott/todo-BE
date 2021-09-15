const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
  username: String!
  passwordHash: String!
}

#Queries
#Where all of our queries in our application live
type Query {
  #Returns a list of users
  getAllUsers: [User!]!
  #getMatchingUser
  user(username: String!): User
}

#Mutations
  type Mutation {
    createUser(username: String!, password: String!): User!
  }
`

module.exports = typeDefs