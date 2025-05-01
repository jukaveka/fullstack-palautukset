const { test, describe } = require("node:test")
const assert = require("node:assert")
const listHelper = require("../utils/list_helper")

test("dummy returns one", () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe("Total likes", () => {
  const listWithoutBlogs = []

  test("in list with no blogs results 0", () => {
    const result = listHelper.totalLikes(listWithoutBlogs)

    assert.strictEqual(result, 0)
  })
})