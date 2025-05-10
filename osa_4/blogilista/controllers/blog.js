const mongoose = require("mongoose")
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
  } else if (!blog.title || !blog.url) {
    response.status(400).json({ error: "Blog is missing required content, like title or url" })
  }

  const result = await blog.save()
  response.status(201).json(result)
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