const blogRouter = require("express").Router()
const { update } = require("lodash")
const blog = require("../models/blog")
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
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body

  if (!title || !url) {
    response.status(400).json({ error: "title and url can't be empty"})
  }

  const blog = await Blog.findById(request.params.id)

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = !likes 
    ? 0 
    : likes
  
  const updatedBlog = await Blog.save()

  response.json(updatedBlog)
})

module.exports = blogRouter