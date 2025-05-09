const { test, describe, beforeEach, after } = require("node:test")
const assert = require("node:assert")
const app = require("../app")
const mongoose = require("mongoose")
const supertest = require("supertest")
const Blog = require("../models/blog")
const testBlogs = require("./test_blogs")
const helper = require("./blog_test_helper")

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

      const allBlogs = await helper.blogsInDb()
      assert.strictEqual(allBlogs.length, testBlogs.listWithManyBlogs.length + 1)

      const blogTitles = allBlogs.map(blog => blog.title)
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
      const testBlog = await helper.getSingleTestBlog()

      await api
        .delete(`/api/blogs/${testBlog.id}`)
        .expect(204)
    })

    test("returns status 204 if blog doesn't exist", async () => {
      const nonExistentBlogId = await helper.nonExistingId()

      await api
        .delete(`/api/blogs/${nonExistentBlogId}`)
        .expect(204)
    })

    test("fails with status 400 if id is malformatted", async () => {
      const malformattedBlogId = 12345

      await api
        .delete(`/api/blogs/${malformattedBlogId}`)
        .expect(400)
    })
  })

  describe("Updating blog", () => {
    test("succeeds with status 200 if blog is valid", async () => {
      const testBlog = await helper.getSingleTestBlog()

      const originalLikes = testBlog.likes

      testBlog.likes += 1

      const updatedBlog = await api
        .put(`/api/blogs/${testBlog.id}`)
        .send(testBlog)
        .expect(200)
        .expect("Content-Type", /application\/json/)

      assert.strictEqual(updatedBlog.body.likes, originalLikes + 1)
    })

    test("fails with status 404 if blog doesn't exist", async () => {
      const nonExistentBlogId = await helper.nonExistingId()

      const testBlog = testBlogs.newBlog

      await api
        .put(`/api/blogs/${nonExistentBlogId}`)
        .send(testBlog)
        .expect(404)
    })

    test("fails with status 400 if id is malformatted", async () => {
      const malformattedBlogId = 12345

      const testBlog = testBlogs.newBlog

      await api
        .put(`/api/blogs/${malformattedBlogId}`)
        .send(testBlog)
        .expect(400)
    })
  })
})

after(async () => {
  mongoose.connection.close()
})