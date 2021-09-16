const express = require('express')
const cors = require('cors')
const notFoundMiddleware = require('./middleware/not-found.js')
const errorMiddleware = require('./middleware/error.js')
const ensureAuth = require('./middleware/ensureAuth.js')
const expressJwt = require('express-jwt')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.get('/', (req, res) => {
  res.send({ hello: 'world' });
});


app.use(express.json())
app.use(cors({
  credentials: 'include',
  origin: false
}));
app.use(
  expressJwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    credentialsRequired: false
  })
)
app.use(ensureAuth)

module.exports = app;
