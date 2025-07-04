const { beforeEach, describe, test, after } = require("node:test")
const assert = require("node:assert")
const supertest = require("supertest")
const mongoose = require("mongoose")
const testUserData = require("./user_test_data")
const User = require("../models/user")
const app = require("../app")
const helper = require("./test_functions")
const jwt = require("jsonwebtoken")

const api = supertest(app)

describe("With few test users in database", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const testUsers = await helper.addHashedPasswordsToUsers(testUserData.listOfLoginTestUsers)

    await User.insertMany(testUsers)
  })

  describe("Logging in as test user", () => {
    test("succeeds with valid username and password", async () => {
      const testUserCredentials = {
        username: testUserData.listOfLoginTestUsers[0].username,
        password: testUserData.listOfLoginTestUsers[0].password
      }

      const response = await api
        .post("/api/login")
        .send(testUserCredentials)
        .expect(200)
        .expect("Content-Type", /application\/json/)

      const decodedToken = jwt.verify(response.body.token, process.env.SECRET)

      assert.strictEqual(decodedToken.username, testUserCredentials.username)
    })
  })
})

after( async () => {
  mongoose.connection.close()
})