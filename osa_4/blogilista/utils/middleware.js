const errorHandler = (error, request, response, next) => {
  if (error.name === "MongoServerError" && error.message.includes("E11000 duplicate key error")) {
    return response.status(400).json({ error: "Username already exists "})
  }

  next(error)
}

module.exports = { errorHandler }