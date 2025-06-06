const blogRouter = require("express").Router()
const blogService = require("../services/blogService")
const userService = require("../services/userService")
const { userExtractor } = require("../utils/middleware")

blogRouter.get('/', async (request, response) => {
  const blogs = await blogService.fetchAllBlogs()

  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response, next) => {
  const validatedRequest = blogService.validateBlogPostRequest(request)

  if (validatedRequest.invalidRequest) {
    return response.status(validatedRequest.status).json({ error: validatedRequest.error })
  }

  const addedBlog = await blogService.saveBlogAndUpdateUser(request)

  response.status(201).json(addedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const validatedRequest = await blogService.validateBlogDeletionRequest(request)

  if (validatedRequest.invalidRequest) {
    return response.status(validatedRequest.status).json({ error: validatedRequest.error })
  }

  const deletedBlog = await blogService.deleteBlog(request.params.id)

  await userService.removeBlogFromUser(deletedBlog.id, deletedBlog.user)

  response.status(204).end()
})

blogRouter.put("/:id", async (request, response, next) => {
  const validatedRequest = await blogService.validateBlogUpdateRequest(request)

  if (validatedRequest.invalidRequest) {
    return response.status(validatedRequest.status).json({ error: validatedRequest.error })
  }

  const blog = await blogService.findBlog(request.params.id)
  const updatedBlog = await blogService.saveBlog(blog, request.body, blog.user)
  await updatedBlog.populate("user", { username: 1, name: 1 })

  response.json(updatedBlog)
})

module.exports = blogRouter