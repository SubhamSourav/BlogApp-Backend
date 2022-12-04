const { json } = require('express')
const app = require('./app')
const connectwithDB = require('./config/db')
require('dotenv').config

connectwithDB()

app.listen(process.env.PORT, () => {
  console.log(`Server listening at port ${process.env.PORT}`)
})
