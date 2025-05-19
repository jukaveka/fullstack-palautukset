const mongoose = require("mongoose")
const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const tokenUtil = require("../utils/token")
const { userExtractor } = require("../utils/middleware")

const saveBlog = async (blog, request, user) => {
  blog.title = request.title
  blog.author = request.author
  blog.url = request.url
  blog.user = user
  blog.likes = !request.likes
    ? 0
    : request.likes

  return await blog.save()
}

const findBlog = async (id) => {
  return await Blog.findById(id)
}

const findUser = async (id) => {
  return await User.findById(id)
}

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

const deleteBlog = async (id) => {
  return await Blog.findByIdAndDelete(id)
}

const nonexistentBlog = async (id) => {
  const blog = await findBlog(id)

  return !blog
}

const invalidUserForDeletion = async (id, requestUser) => {
  const blog = await findBlog(id)

  return !blog.user.toString() === requestUser
}

const generateErrorResponseObject = (status, message) => {
  return {
    invalidRequest: true,
    status: status,
    error: message
  }
}

const validResponseObject = { invalidRequest: false}

const validateBlogDeletionRequest = async (request) => {
  if (invalidToken(request.token)) {
    return generateErrorResponseObject(401, "invalid token")
  }

  if ( requestIdIsInvalid(request.params.id) ) {
    return generateErrorResponseObject(400, "Malformatted id") 
  }

  const blogIsNonexistent = await nonexistentBlog(request.params.id)
  
  if (blogIsNonexistent) {
    return generateErrorResponseObject(204, "Blog with given id not found") 
  }

  const userIsNotAuthorizedForOperation = await invalidUserForDeletion(request.params.id, request.user)
  
  if (userIsNotAuthorizedForOperation) {
    return generateErrorResponseObject(401, "Invalid token for deleting blog") 
  }

  return validResponseObject
}

const validateBlogUpdateRequest = async (request) => {
  if ( requestIdIsInvalid(request.params.id) ) {
    return generateErrorResponseObject(400, "Malformatted id")
  }
  
  if ( requestMissingRequiredInformation(request.body) ) {
    return generateErrorResponseObject(400, "title or url can't be empty")
  }

  const blogIsNonexistent = await nonexistentBlog(request.params.id)
  
  if (blogIsNonexistent) {
    return generateErrorResponseObject(404, "Blog with given id not found")
  }

  return validResponseObject
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate("user", { username: 1, name: 1 })

  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response, next) => {
  const decodedToken = tokenUtil.decodeJwtToken(request.token)

  if (!decodedToken.id) {
    return response.status(401).json({ error: "invalid token" })
  }

  const body = request.body

  if (!body.title || !body.url) {
    return response.status(400).json({ error: "Request is missing required content, like title or url" })
  }

  const blog = new Blog()

  const addedBlog = await saveBlog(blog, request.body, request.user)

  const blogUser = await findUser(addedBlog.user)

  blogUser.blogs = blogUser.blogs.concat(addedBlog._id)
  await blogUser.save()

  response.status(201).json(addedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const validatedRequest = await validateBlogDeletionRequest(request)

  if (validatedRequest.invalidRequest) {
    return response.status(validatedRequest.status).json({ error: validatedRequest.error })
  }

  await deleteBlog(request.params.id)
  response.status(204).end()
})

blogRouter.put("/:id", async (request, response, next) => {
  const validatedRequest = await validateBlogUpdateRequest(request)

  if (validatedRequest.invalidRequest) {
    return response.status(validatedRequest.status).json({ error: validatedRequest.error })
  }

  const blog = await findBlog(request.params.id)

  const updatedBlog = await saveBlog(blog, request.body, blog.user)

  response.json(updatedBlog)
})

module.exports = blogRouter