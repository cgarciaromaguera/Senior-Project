const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8080;

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')

// express app
const app = express();

// middleware
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.ATLAS_URI)
  .then(() => {
    app.listen(port, () => {
      console.log('Connected to MongoDB & listening on port', port)
    })
  })
  .catch((error) => {
    console.log(error)
  })