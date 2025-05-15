const { test, describe } = require("node:test")
const assert = require("node:assert")
const listHelper = require("../utils/list_helper")
const testBlogs = require("./blog_test_data")

test("dummy returns one", () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe("Total likes", () => {
  test("of list with no blogs results 0", () => {
    const result = listHelper.totalLikes(testBlogs.listWithoutBlogs)

    assert.strictEqual(result, 0)
  })

  test("of list with one blog matches likes of the blog", () => {
    const result = listHelper.totalLikes(testBlogs.listWithOneBlog)

    assert.strictEqual(result, 5)
  })

  test("of list with multiple blogs matches the total count of blog likes", () => {
    const result = listHelper.totalLikes(testBlogs.listWithManyBlogs)

    assert.strictEqual(result, 36)
  })

})

describe("Favourite blog", () => {
  test("is 0 if array is empty", () => {
    const result = listHelper.favouriteBlog(testBlogs.listWithoutBlogs)

    assert.strictEqual(result, 0)
  })

  test("is the only blog in array with one blog", () => {
    const result = listHelper.favouriteBlog(testBlogs.listWithOneBlog)

    assert.deepStrictEqual(result, testBlogs.listWithOneBlog[0])
  })

  test("is the blog with most likes in array with multiple blogs", () => {
    const result = listHelper.favouriteBlog(testBlogs.listWithManyBlogs)

    assert.deepStrictEqual(result, testBlogs.listWithManyBlogs[2])
  })

  test("is the first blog with most likes in array with multiple favourite blogs", () => {
    const result = listHelper.favouriteBlog(testBlogs.listWithTiedTopLikes)

    assert.deepStrictEqual(result, testBlogs.listWithTiedTopLikes[1])
  })
})

describe("Author with most blogs", () => {
  test("is 0 with empty array", () => {
    const result = listHelper.mostBlogs(testBlogs.listWithoutBlogs)

    assert.strictEqual(result, 0)
  })

  test("is one with array with one blog", () => {
    const correctResult = {
      author: "Edsger W. Dijkstra",
      blogs: 1
    }
    const result = listHelper.mostBlogs(testBlogs.listWithOneBlog)

    assert.deepStrictEqual(result, correctResult)
  })

  test("is author with most blogs in array with multiple blogs", () => {
    const correctResult = {
      author: "Robert C. Martin",
      blogs: 3
    }

    const result = listHelper.mostBlogs(testBlogs.listWithManyBlogs)

    assert.deepStrictEqual(result, correctResult)
  })

  test("is first appearing author with most blogs in array with multiple top bloggers", () => {
    const correctResult = {
      author: "Edsger W. Dijkstra",
      blogs: 2
    }

    const result = listHelper.mostBlogs(testBlogs.listWithTiedMostBlogs)

    assert.deepStrictEqual(result, correctResult)
  })
})

describe("Author with most blog likes", () => {
  test("is 0 with empty array", () => {
    const result = listHelper.mostLikes(testBlogs.listWithoutBlogs)

    assert.strictEqual(result, 0)
  })

  test("matches likes of only blog when array has one blog", () => {
    const correctResult = {
      author: "Edsger W. Dijkstra",
      likes: 5
    }
    const result = listHelper.mostLikes(testBlogs.listWithOneBlog)

    assert.deepStrictEqual(result, correctResult)
  })

  test("matches likes of author with most likes when array has multiple blogs", () => {
    const correctResult = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    const result = listHelper.mostLikes(testBlogs.listWithManyBlogs)

    assert.deepStrictEqual(result, correctResult)
  })

  test("matches likes of first appearing author with most likes when array has multiple authors with most likes", () => {
    const correctResult = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    
    const result = listHelper.mostLikes(testBlogs.listWithTiedMostLikesForAuthor)

    assert.deepStrictEqual(result, correctResult)
  })
})