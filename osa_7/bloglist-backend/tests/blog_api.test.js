const { test, describe, beforeEach, after } = require("node:test")
const assert = require("node:assert")
const app = require("../app")
const mongoose = require("mongoose")
const supertest = require("supertest")
const Blog = require("../models/blog")
const User = require("../models/user")
const testBlogData = require("./blog_test_data")
const testUserData = require("./user_test_data")
const helper = require("./test_functions")

const api = supertest(app)

describe("With initial test blogs inserted", () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    await User.insertMany(testUserData.listOfTestUsers)
    const insertedBlogs = await Blog.insertMany(testBlogData.listWithManyBlogs)
    const insertedBlogIds = insertedBlogs.map(blog => blog._id.toString())

    const user = await User.findOne({})

    await Blog.updateMany({}, { user: user._id })
    await User.updateOne({ _id: user._id }, { blogs: insertedBlogIds })
  })

  describe("Fetching all blogs", () => {
    test("returns all blogs as JSON", async () => {
      const allBlogs = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)

      assert.strictEqual(allBlogs.body.length, testBlogData.listWithManyBlogs.length)
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
      const testBlog = testBlogData.newBlog
      const testUser = await helper.getSingleTestUser()
      const validToken = await helper.generateTestToken(testUser)

      const addedBlog = await api
        .post("/api/blogs")
        .set("authorization", `Bearer ${validToken}`)
        .send(testBlog)
        .expect(201)

      const allBlogs = await helper.blogsInDb()
      assert.strictEqual(allBlogs.length, testBlogData.listWithManyBlogs.length + 1)

      const blogTitles = allBlogs.map(blog => blog.title)
      assert(blogTitles.includes(testBlog.title))

      assert.strictEqual(addedBlog.body.title, testBlog.title)

      const decodedToken = helper.decodeTestUserToken(validToken)
      assert.strictEqual(addedBlog.body.user._id, decodedToken.id)

      const userAfterRequest = await User.findById(testUser._id)
      assert.strictEqual(userAfterRequest.blogs.length, testUser.blogs.length + 1)
    })

    test("corrects likes to 0 if none are given", async () => {
      const testBlog = testBlogData.newBlogWithoutLikes
      const testUser = await helper.getSingleTestUser()
      const validToken = await helper.generateTestToken(testUser)

      const addedBlog = await api
        .post("/api/blogs")
        .set("authorization", `Bearer ${validToken}`)
        .send(testBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

      assert.strictEqual(addedBlog.body.likes, 0)
    })

    test("fails with status 400 if blog is missing title", async () => {
      const testBlog = testBlogData.newBlogWithoutTitle
      const testUser = await helper.getSingleTestUser()
      const validToken = await helper.generateTestToken(testUser)

      await api
        .post("/api/blogs")
        .set("authorization", `Bearer ${validToken}`)
        .send(testBlog)
        .expect(400)
        .expect("Content-Type", /application\/json/)
    })

    test("fails with status 400 if blog is missing url", async () => {
      const testBlog = testBlogData.newBlogWithoutUrl
      const testUser = await helper.getSingleTestUser()
      const validToken = await helper.generateTestToken(testUser)

      await api
        .post("/api/blogs")
        .set("authorization", `Bearer ${validToken}`)
        .send(testBlog)
        .expect(400)
        .expect("Content-Type", /application\/json/)
    })

    test("fails with status 401 if token is missing", async () => {
      const testBlog = testBlogData.newBlogWithoutUrl

      await api
        .post("/api/blogs")
        .send(testBlog)
        .expect(401)
        .expect("Content-Type", /application\/json/)
    })

    test("fails with status 401 if token is invalid", async () => {
      const testBlog = testBlogData.newBlogWithoutUrl

      const invalidToken = "abcd1234"

      await api
        .post("/api/blogs")
        .set("authorization", `Bearer ${invalidToken}`)
        .send(testBlog)
        .expect(401)
        .expect("Content-Type", /application\/json/)
    })
  })

  describe("Deleting blog", () => {
    test("succeeds with status 204 if blog exists", async () => {
      const blogsBeforeRequest = await helper.blogsInDb()

      const testBlog = await helper.getSingleTestBlog()
      const testUser = await User.findById(testBlog.user)
      const validToken = await helper.generateTestToken(testUser)

      const userBlogsBeforeRequest = testUser.blogs

      await api
        .delete(`/api/blogs/${testBlog.id}`)
        .set(`authorization`, `Bearer ${validToken}`)
        .expect(204)

      const blogsAfterRequest = await helper.blogsInDb()
      assert.strictEqual(blogsAfterRequest.length, blogsBeforeRequest.length - 1)

      const userAfterRequest = await User.findById(testUser.id)
      assert.strictEqual(userAfterRequest.blogs.length, userBlogsBeforeRequest.length - 1)
      assert(!userAfterRequest.blogs.includes(testBlog.id))
    })

    test("returns status 204 if blog doesn't exist", async () => {
      const nonExistentBlogId = await helper.nonExistingId()

      const testUser = await helper.getSingleTestUser()
      const validToken = await helper.generateTestToken(testUser)

      await api
        .delete(`/api/blogs/${nonExistentBlogId}`)
        .set(`authorization`, `Bearer ${validToken}`)
        .expect(204)
    })

    test("fails with status 400 if id is malformatted", async () => {
      const malformattedBlogId = 12345

      const testUser = await helper.getSingleTestUser()
      const validToken = await helper.generateTestToken(testUser)

      await api
        .delete(`/api/blogs/${malformattedBlogId}`)
        .set(`authorization`, `Bearer ${validToken}`)
        .expect(400)
    })

    test("fails with status 401 if deleting user is not creator of the blog", async () => {
      const blogsBeforeRequest = await helper.blogsInDb()

      const testBlog = await helper.getSingleTestBlog()
      const authorizedUser = await User.findById(testBlog.user)
      const unauthorizedUser = await User.findOne({ _id: { $ne: authorizedUser } })
      const unauthorizedToken = helper.generateTestToken(unauthorizedUser)

      await api
        .delete(`/api/blogs/${testBlog.id}`)
        .set(`authorization`, `Bearer ${unauthorizedToken}`)
        .expect(401)
        .expect("Content-Type", /application\/json/)

      const blogsAfterRequest = await helper.blogsInDb()
      assert.strictEqual(blogsAfterRequest.length, blogsBeforeRequest.length)
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

      const testBlog = testBlogData.newBlog

      await api
        .put(`/api/blogs/${nonExistentBlogId}`)
        .send(testBlog)
        .expect(404)
    })

    test("fails with status 400 if id is malformatted", async () => {
      const malformattedBlogId = 12345

      const testBlog = testBlogData.newBlog

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