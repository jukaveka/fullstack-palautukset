const { beforeEach, describe, test, after } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const User = require("../models/user")

const api = supertest(app)

describe("With initial test user in database", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    await User.insertOne({ username: "miketyson", name: "mike", password: "imabiternotafighter" })
  })

  describe("Fetching users", () => {
    test("fetches all users as JSON", async () => {
      const users = await api
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /application\/json/)

      assert.strictEqual(users.body.length, 1)
    })
  })

  describe("Adding user", () => {
    test("succeeds with valid object", async () => {
      const usersBeforeRequest = await User.find({})

      const newUser = {
        username: "tomtailor",
        name: "tom",
        password: "seunohdettutom"
      }

      const addedUser = await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/)

      const usersAfterRequest = await User.find({})
      assert.strictEqual(usersAfterRequest.length, usersBeforeRequest.length + 1)

      const usernames = usersAfterRequest.map(user => user.username)
      assert(usernames.includes(newUser.username))
    })

    test("fails with status 400 if username is under 3 characters", async () => {
      const usersBeforeRequest = await User.find({})

      const newUser = {
        username: "to",
        name: "Tom",
        password: "seunohdettutom"
      }

      const response = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      const usersAfterRequest = await User.find({})
      assert.strictEqual(usersAfterRequest.length, usersBeforeRequest.length)

      assert(response.error.text.includes("Username and password must be at least 3 characters"))
    })

    test("fails with status 400 if password is under 3 characters", async () => {
      const usersBeforeRequest = await User.find({})

      const newUser = {
        username: "Timur",
        name: "Timur",
        password: "ti"
      }

      const response = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      const usersAfterRequest = await User.find({})
      assert.strictEqual(usersAfterRequest.length, usersBeforeRequest.length)

      assert(response.error.text.includes("Username and password must be at least 3 characters"))
    })
  })
})

after(async () => {
  mongoose.connection.close()
})