const blogRouter = require("express").Router()
const Blog = require("../models/blog")

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.likes) {
    blog.likes = 0
  }
  if (!blog.title) {
    response.status(400).json({ error: "Blog is missing a title" })
  }

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogRouter