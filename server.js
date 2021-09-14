const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttp } = require('apollo-server-core')
const app = require('./lib/app.js')
const httpServer = require('http').createServer(app)

const PORT = process.env.PORT || 4000;

const startApolloServer = async (typeDefs, resolvers) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttp({ httpServer })]
  });
  await server.start();
  server.applyMiddleware({ app })
  await new Promise(resolve => httpServer.listen({ port: PORT }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}