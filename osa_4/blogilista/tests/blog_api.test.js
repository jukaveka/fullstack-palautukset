const { test, describe, beforeEach, after } = require("node:test")
const assert = require("node:assert")
const app = require("../app")
const mongoose = require("mongoose")
const supertest = require("supertest")
const Blog = require("../models/blog")
const testBlogs = require("./test_blogs")

const api = supertest(app)

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
  })
})

after(async () => {
  mongoose.connection.close()
})