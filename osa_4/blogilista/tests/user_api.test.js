const { beforeEach, describe, test, after } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const User = require("../models/user")

const api = supertest(app)

describe("With initial test user in database", () => {
  beforeEach( async () => {
    await User.deleteMany({})

    await User.insertOne({ username: "miketyson", name: "mike", password: "imabiternotafighter" })
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
        .expect(200)
        .expect("Content-Type", /application\/json/)

      const usersAfterRequest = await User.find({})
      assert.strictEqual(usersAfterRequest.length, usersBeforeRequest.length + 1)

      const usernames = usersAfterRequest.map(user => user.username)
      assert(usernames.includes(newUser.username))
    })
  })
})

after( async () => {
  mongoose.connection.close()
})