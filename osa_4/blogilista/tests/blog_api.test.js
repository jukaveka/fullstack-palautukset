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
  test("Returns all blogs as JSON", async () => {
    const allBlogs = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)

    assert.strictEqual(allBlogs.body.length, testBlogs.listWithManyBlogs.length)
  })
})

after(async () => {
  mongoose.connection.close()
})