const Blog = require("../models/blog")
const userService = require("./userService")
const validatorService = require("./requestValidatorService")
const tokenService = require("./tokenService")

const fetchAllBlogs = async () => {
  const blogs = await Blog
    .find({})
    .populate("user", { username: 1, name: 1 })

  return blogs
}

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

const deleteBlog = async (id) => {
  return await Blog.findByIdAndDelete(id)
}

const nonexistentBlog = async (id) => {
  const blog = await findBlog(id)

  return !blog
}

const saveBlogAndUpdateUser = async (request) => {
  const addedBlog = await saveBlog(new Blog(), request.body, request.user)

  const blogUser = await userService.findUser(addedBlog.user)

  blogUser.blogs = blogUser.blogs.concat(addedBlog._id)
  await blogUser.save()

  return addedBlog.populate("user", { username: 1, name: 1 })
}

// Request validation functions

const requestMissingRequiredInformation = (requestBody) => {
  return !(requestBody.title && requestBody.url)
}

const unauthorizedOperation = async (id, requestUser) => {
  const blog = await findBlog(id)

  return !blog.user.toString() === requestUser
}

const validateBlogPostRequest = (request) => {
  if (tokenService.invalidToken(request.token)) {
    return validatorService.generateInvalidRequestObject(401, "invalid token")
  }

  if (requestMissingRequiredInformation(request.body)) {
    return validatorService.generateInvalidRequestObject(400, "title or url can't be empty")
  }

  return validatorService.generateValidRequestObject()
}

const validateBlogUpdateRequest = async (request) => {
  if (validatorService.requestIdIsInvalid(request.params.id) ) {
    return validatorService.generateInvalidRequestObject(400, "Malformatted id")
  }
  
  if (requestMissingRequiredInformation(request.body) ) {
    return validatorService.generateInvalidRequestObject(400, "title or url can't be empty")
  }

  const blogIsNonexistent = await nonexistentBlog(request.params.id)
  if (blogIsNonexistent) {
    return validatorService.generateInvalidRequestObject(404, "Blog with given id not found")
  }

  return validatorService.generateValidRequestObject()
}

const validateBlogDeletionRequest = async (request) => {
  if (tokenService.invalidToken(request.token)) {
    return validatorService.generateInvalidRequestObject(401, "invalid token")
  }

  if (validatorService.requestIdIsInvalid(request.params.id) ) {
    return validatorService.generateInvalidRequestObject(400, "Malformatted id") 
  }

  const blogIsNonexistent = await nonexistentBlog(request.params.id)
  if (blogIsNonexistent) {
    return validatorService.generateInvalidRequestObject(204, "Blog with given id not found") 
  }

  const unauthorizedUser = await unauthorizedOperation(request.params.id, request.user)
  if (unauthorizedUser) {
    return validatorService.generateInvalidRequestObject(401, "Invalid token for deleting blog") 
  }

  return validatorService.generateValidRequestObject()
}

module.exports = {
  fetchAllBlogs,
  saveBlog,
  findBlog,
  deleteBlog,
  nonexistentBlog,
  saveBlogAndUpdateUser,
  validateBlogPostRequest,
  validateBlogUpdateRequest,
  validateBlogDeletionRequest
}