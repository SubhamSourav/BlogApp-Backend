const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

//importing Routes
const userRoutes = require('./routes/user')
const blogRoutes = require('./routes/blog')

app.use('/api/user', userRoutes)
app.use('/api/blog', blogRoutes)

module.exports = app
