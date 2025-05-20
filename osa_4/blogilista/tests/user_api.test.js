const { beforeEach, describe, test, after } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const testUserData = require("./user_test_data")
const helper = require("./test_functions")
const User = require("../models/user")

const api = supertest(app)

describe("With initial test user in database", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    await User.insertMany(testUserData.listOfTestUsers)
  })

  describe("Fetching users", () => {
    test("fetches all users as JSON", async () => {
      const users = await api
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /application\/json/)

      assert.strictEqual(users.body.length, testUserData.listOfTestUsers.length)
    })
  })

  describe("Adding user", () => {
    test("succeeds with valid object", async () => {
      const usersBeforeRequest = await helper.usersInDb()

      const validUser = {
        username: "tomtailor",
        name: "tom",
        password: "seunohdettutom"
      }

      const addedUser = await api
        .post("/api/users")
        .send(validUser)
        .expect(201)
        .expect("Content-Type", /application\/json/)

      const usersAfterRequest = await helper.usersInDb()
      assert.strictEqual(usersAfterRequest.length, usersBeforeRequest.length + 1)

      const usernames = usersAfterRequest.map(user => user.username)
      assert(usernames.includes(validUser.username))
    })

    test("fails with status 400 if username is under 3 characters", async () => {
      const usersBeforeRequest = await helper.usersInDb()

      const userWithInvalidUsername = {
        username: "to",
        name: "Tom",
        password: "seunohdettutom"
      }

      const response = await api
        .post("/api/users")
        .send(userWithInvalidUsername)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      const usersAfterRequest = await helper.usersInDb()
      assert.strictEqual(usersAfterRequest.length, usersBeforeRequest.length)

      assert(response.error.text.includes("Username must be at least 3 characters"))
    })

    test("fails with status 400 if password is under 3 characters", async () => {
      const usersBeforeRequest = await helper.usersInDb()

      const userWithInvalidPassword = {
        username: "Testiorava",
        name: "Orava",
        password: "ti"
      }

      const response = await api
        .post("/api/users")
        .send(userWithInvalidPassword)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      const usersAfterRequest = await helper.usersInDb()
      assert.strictEqual(usersAfterRequest.length, usersBeforeRequest.length)

      assert(response.error.text.includes("Password must be at least 3 characters"))
    })

    test("fails with status 400 if username already exists", async () => {
      const usersBeforeRequest = await helper.usersInDb()

      const userWIthExistingUsername = {
        username: "Testimies",
        name: "Mies",
        password: "Testimiehensalasana"
      }

      await api
        .post("/api/users")
        .send(userWIthExistingUsername)
        .expect(400)
        .expect("Content-Type", /application\/json/)

      const usersAfterRequest = await helper.usersInDb()
      assert.strictEqual(usersAfterRequest.length, usersBeforeRequest.length)
    })
  })
})

after(async () => {
  mongoose.connection.close()
})