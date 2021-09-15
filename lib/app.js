const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const URL = process.env.MONGO_DB_URI;

const app = express()

mongoose.connect(`${URL}`, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('we\'re connected!');
  // we're connected!
});


app.use(express.json())
app.use(cors({
  credentials: false,
  origin: false
}));

module.exports = app;
