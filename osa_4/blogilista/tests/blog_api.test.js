const { test, describe, beforeEach, after } = require("node:test")
const assert = require("node:assert")
const app = require("../app")
const mongoose = require("mongoose")
const supertest = require("supertest")
const Blog = require("../models/blog")
const testBlogs = require("./test_blogs")

const api = supertest(app)

describe("With initial test blogs inserted", () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    await Blog.insertMany(testBlogs.listWithManyBlogs)
  })

  describe("Fetching all blogs", () => {
    test("returns all blogs as JSON", async () => {
      const allBlogs = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)

      assert.strictEqual(allBlogs.body.length, testBlogs.listWithManyBlogs.length)
    })

    test("uses id as identifier instead of _id", async () => {
      const allBlogs = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)

      const blogKeys = allBlogs.body.map(blog => Object.keys(blog))

      assert(blogKeys[0].includes("id"))
      assert(!blogKeys[0].includes("_id"))
    })
  })

  describe("Posting new blog", () => {
    test("succeeds with valid blog", async () => {
      const testBlog = testBlogs.newBlog

      const addedBlog = await api
        .post("/api/blogs")
        .send(testBlog)
        .expect(201)

      const allBlogs = await api.get("/api/blogs")
      assert.strictEqual(allBlogs.body.length, testBlogs.listWithManyBlogs.length + 1)

      const blogTitles = allBlogs.body.map(blog => blog.title)
      assert(blogTitles.includes(testBlog.title))
    })

    test("corrects likes to 0 if none are given", async () => {
      const testBlog = testBlogs.newBlogWithoutLikes

      const addedBlog = await api
        .post("/api/blogs")
        .send(testBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

      assert.strictEqual(addedBlog.body.likes, 0)
    })

    test("fails with status 400 if blog is missing title", async () => {
      const testBlog = testBlogs.newBlogWithoutTitle

      await api
        .post("/api/blogs")
        .send(testBlog)
        .expect(400)
        .expect("Content-Type", /application\/json/)
    })

    test("fails with status 400 if blog is missing url", async () => {
      const testBlog = testBlogs.newBlogWithoutUrl

      await api
        .post("/api/blogs")
        .send(testBlog)
        .expect(400)
        .expect("Content-Type", /application\/json/)
    })
  })

  describe("Deleting blog", () => {
    test("succeeds with status 204 if blog exists", async () => {
      const testBlogs = await api.get("/api/blogs")
      const testBlog = testBlogs.body[0]

      await api
        .delete(`/api/blogs/${testBlog.id}`)
        .expect(204)
    })
  })
})

after(async () => {
  mongoose.connection.close()
})