const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  userId: String,
  content: String,
  completed: Boolean
})

module.exports = todoSchema