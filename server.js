const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const app = require('./lib/app.js')
const mongo = require('./connection.js')
const httpServer = require('http').createServer(app)
const typeDefs = require('./Schema/typeDefs.js')
const resolvers = require('./Schema/resolvers.js')

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({ typeDefs, resolvers, plugins: [ApolloServerPluginDrainHttpServer({ httpServer })] });
server.start()
  .then(() => server.applyMiddleware({ app }))


app.listen({ port: PORT }, () => {
  console.log(`Server is running at http://localhost:4000${server.graphqlPath}`);
});

// const startApolloServer = async (typeDefs, resolvers) => {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
//   });
//   await mongo()
//   await server.start()
//   server.applyMiddleware({ app })
//   await new Promise(resolve => httpServer.listen({ port: PORT }, resolve))
//   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
// }

// startApolloServer(typeDefs, resolvers)
