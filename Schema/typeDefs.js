const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
  _id: String!
  username: String!
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
    login(username: String!, password: String!): User!
    signup(username: String!, password: String!): User!
  }
`

module.exports = typeDefs