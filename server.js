const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const app = require('./lib/app.js')
const mongo = require('./connection.js')
const httpServer = require('http').createServer(app)
const typeDefs = require('./Schema/typeDefs.js')
const resolvers = require('./Schema/resolvers.js')

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const user = req.headers.authorization || null;
    const isAuth = req.isAuth
    const userId = req.userId || null
    return { user, isAuth, userId }
  },
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

server.start()
  .then(() => server.applyMiddleware({ app }))


app.listen({ port: PORT }, () => {
  console.log(`Server is running at http://localhost:4000${server.graphqlPath}`);
});

