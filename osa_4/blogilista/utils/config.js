require("dotenv").config()

const getDatabaseURI = (nodeEnv) => {
  if (nodeEnv === "test") {
    return process.env.TEST_MONGODB_URI
  } else if (nodeEnv === "development") {
    return process.env.DEV_MONGODB_URI
  } else if (nodeEnv === "production") {
    return process.env.MONGODB_URI
  }

  return 0
}

const PORT = process.env.PORT
const MONGODB_URI = getDatabaseURI(process.env.NODE_ENV)

module.exports = { PORT, MONGODB_URI }