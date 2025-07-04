const tokenService = require("../services/tokenService")

const errorHandler = (error, request, response, next) => {
  if (error.name === "MongoServerError" && error.message.includes("E11000 duplicate key error")) {
    return response.status(400).json({ error: "Username already exists" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "token is missing or invalid" })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization")

  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "")
  } else {
    request.token = null
  }

  next()
}

const userExtractor = (request, response, next) => {
  const decodedToken = tokenService.decodeJwtToken(request.token)

  request.user = !decodedToken.id
    ? null
    : decodedToken.id

  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor
}