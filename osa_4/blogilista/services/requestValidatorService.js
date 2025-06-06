const mongoose = require("mongoose")

const requestIdIsInvalid = (id) => {
  return !mongoose.Types.ObjectId.isValid(id)
}

const generateInvalidRequestObject = (status, message) => {
  return {
    invalidRequest: true,
    status: status,
    error: message
  }
}

const generateValidRequestObject = () => {
  return { invalidRequest: false }
}
module.exports = {
  requestIdIsInvalid,
  generateInvalidRequestObject,
  generateValidRequestObject
}