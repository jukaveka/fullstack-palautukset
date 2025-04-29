const express = require('express')
const mongoose = require('mongoose')
const config = require("./utils/config")
const blogRouter = require("./controllers/blog")

const app = express()
app.use(express.json())

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(express.json())
app.use("/api/blogs", blogRouter)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})