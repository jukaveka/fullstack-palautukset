const express = require('express')
const mongoose = require('mongoose')
const config = require("./utils/config")
const middleware = require("./utils/middleware")
const blogRouter = require("./controllers/blog")
const userRouter = require("./controllers/user")
const loginRouter = require("./controllers/login")

const app = express()
app.use(express.json())

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(express.json())
app.use(middleware.tokenExtractor)

app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)

if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
  const testingRouter = require("./controllers/testing")
  app.use("/api/testing", testingRouter)
}

app.use(middleware.errorHandler)

module.exports = app