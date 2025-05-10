const express = require('express')
const mongoose = require('mongoose')
const config = require("./utils/config")
const blogRouter = require("./controllers/blog")
const userRouter = require("./controllers/user")

const app = express()
app.use(express.json())

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(express.json())
app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter)

module.exports = app