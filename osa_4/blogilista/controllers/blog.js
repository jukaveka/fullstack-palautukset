const mongoose = require("mongoose")
const blogRouter = require("express").Router()
const tokenUtil = require("../utils/token")
const blogService = require("../services/blogService")
const userService = require("../services/userService")
const { userExtractor } = require("../utils/middleware")

const requestIdIsInvalid = (id) => {
  return !mongoose.Types.ObjectId.isValid(id)
}

const requestMissingRequiredInformation = (requestBody) => {
  return !(requestBody.title && requestBody.url)
}

const invalidToken = (token) => {
  const decodedToken = tokenUtil.decodeJwtToken(token)

  return !decodedToken.id
}

const invalidUserForOperation = async (id, requestUser) => {
  const blog = await blogService.findBlog(id)

  return !blog.user.toString() === requestUser
}

const generateErrorResponseObject = (status, message) => {
  return {
    invalidRequest: true,
    status: status,
    error: message
  }
}

const validResponseObject = { invalidRequest: false }

const validateBlogDeletionRequest = async (request) => {
  if (invalidToken(request.token)) {
    return generateErrorResponseObject(401, "invalid token")
  }

  if (requestIdIsInvalid(request.params.id) ) {
    return generateErrorResponseObject(400, "Malformatted id") 
  }

  const blogIsNonexistent = await blogService.nonexistentBlog(request.params.id)
  if (blogIsNonexistent) {
    return generateErrorResponseObject(204, "Blog with given id not found") 
  }

  const userIsNotAuthorizedForOperation = await invalidUserForOperation(request.params.id, request.user)
  if (userIsNotAuthorizedForOperation) {
    return generateErrorResponseObject(401, "Invalid token for deleting blog") 
  }

  return validResponseObject
}

const validateBlogUpdateRequest = async (request) => {
  if (requestIdIsInvalid(request.params.id) ) {
    return generateErrorResponseObject(400, "Malformatted id")
  }
  
  if (requestMissingRequiredInformation(request.body) ) {
    return generateErrorResponseObject(400, "title or url can't be empty")
  }

  const blogIsNonexistent = await blogService.nonexistentBlog(request.params.id)
  if (blogIsNonexistent) {
    return generateErrorResponseObject(404, "Blog with given id not found")
  }

  return validResponseObject
}

const validateBlogPostRequest = (request) => {
  if (invalidToken(request.token)) {
    return generateErrorResponseObject(401, "invalid token")
  }

  if (requestMissingRequiredInformation(request.body)) {
    return generateErrorResponseObject(400, "title or url can't be empty")
  }

  return validResponseObject
}

blogRouter.get('/', async (request, response) => {
  const blogs = await blogService.fetchAllBlogs()

  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response, next) => {
  const validatedRequest = validateBlogPostRequest(request)

  if (validatedRequest.invalidRequest) {
    return response.status(validatedRequest.status).json({ error: validatedRequest.error })
  }

  const addedBlog = await blogService.saveBlogAndUpdateUser(request)

  response.status(201).json(addedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const validatedRequest = await validateBlogDeletionRequest(request)

  if (validatedRequest.invalidRequest) {
    return response.status(validatedRequest.status).json({ error: validatedRequest.error })
  }

  const deletedBlog = await blogService.deleteBlog(request.params.id)

  await userService.removeBlogFromUser(deletedBlog.id, deletedBlog.user)

  response.status(204).end()
})

blogRouter.put("/:id", async (request, response, next) => {
  const validatedRequest = await validateBlogUpdateRequest(request)

  if (validatedRequest.invalidRequest) {
    return response.status(validatedRequest.status).json({ error: validatedRequest.error })
  }

  const blog = await blogService.findBlog(request.params.id)
  const updatedBlog = await blogService.saveBlog(blog, request.body, blog.user)
  await updatedBlog.populate("user", {username: 1, name: 1})

  response.json(updatedBlog)
})

module.exports = blogRouter