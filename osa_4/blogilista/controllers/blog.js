const mongoose = require("mongoose")
const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  console.log("Request body", body)

  const user = await User.findById(body.userId)

  console.log("User who added blog", user)

  if (!body.title || !body.url || !user) {
    response.status(400).json({ error: "Blog is missing required content, like title or url" })
  }

  console.log("Title, url and user present in the request")

  if (!body.likes) {
    body.likes = 0
  }

  console.log("Body likes corrected to 0", body.likes)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id,
    likes: body.likes
  })

  console.log("New blog object created", blog)

  const result = await blog.save()

  console.log("Blog saved", result)

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