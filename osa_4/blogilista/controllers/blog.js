const mongoose = require("mongoose")
const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const tokenUtil = require("../utils/token")
const jwt = require("jsonwebtoken")

const getTokenFrom = request => {
  const authorization = request.get("authorization")
  
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "")
  }

  return null
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate("user", { username: 1, name: 1 })

  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  const body = request.body

  const decodedToken = tokenUtil.decodeJwtToken(getTokenFrom(request))
  
  if (!decodedToken.id) {
    return response.status(401).json({ error: "invalid token" })
  }

  const user = await User.findById(decodedToken.id)

  if (!body.title || !body.url || !user) {
    response.status(400).json({ error: "Request is missing required content, like title or url" })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: body.likes || 0
  })

  const addedBlog = await blog.save()

  user.blogs = user.blogs.concat(addedBlog._id)
  await user.save()

  response.status(201).json(addedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    response.status(400).json({ error: "Malformatted id" })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put("/:id", async (request, response) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) {
    response.status(400).json({ error: "Malformatted id" })
  }

  const { title, author, url, likes, id } = request.body

  if (!title || !url) {
    response.status(400).json({ error: "title and url can't be empty" })
  }

  const blogExists = await Blog.countDocuments({ _id: id })

  if (blogExists === 0) {
    response.status(404).json({ error: "Document with given ID doesn't exist " })
  }

  const blog = await Blog.findById(request.params.id)

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = !likes
    ? 0
    : likes

  const updatedBlog = await blog.save()

  response.json(updatedBlog)
})

module.exports = blogRouter