const mongoose = require('mongoose')

require('dotenv-expand')(require('dotenv').config())
const DB_HOST = process.env.DB_HOST

const db = mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

mongoose.connection.on('connected', () => {
  console.log('Database connection successful')
})

mongoose.connection.on('error', err => {
  console.log(`Database connection error db: ${err.message}`)
})

mongoose.connection.on('disconnected', () => {
  console.log('Database connection successful')
})

process.on('SIGINT', async () => {
  await mongoose.connection.close()
  console.log('Database connection closed and app terminated')
  process.exit(1)
})

module.exports = db
