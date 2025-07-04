const { groupBy } = require("lodash")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (totalCount, blog) => {
    return totalCount + blog.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  const reducer = (mostLikedBlog, blog) => {
    return mostLikedBlog.likes >= blog.likes
      ? mostLikedBlog
      : blog
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}
const findAuthorWithMostBlogs = (blogs) => {

}


const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  const groupedAuthors = groupBy(blogs, "author")

  const authors = Object.keys(groupedAuthors)

  const authorsBlogCount = authors.map((author) => {
    return {
      "author": author,
      "blogs": groupedAuthors[author].length
    }
  })

  const authorWithMostBlogs = authorsBlogCount.reduce((topAuthor, author) => {
    return topAuthor.blogs >= author.blogs
      ? topAuthor
      : author
  })

  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  const groupedAuthors = groupBy(blogs, "author")

  const authors = Object.keys(groupedAuthors)

  const authorsBlogLikeCount = authors.map((author) => {
    const authorsBlogs = groupedAuthors[author]

    const authorsBlogsLikes = authorsBlogs
      .map((blog) => blog.likes)
      .reduce((totalBlogLikes, blogLikes) => totalBlogLikes + blogLikes, 0)

    return {
      "author": author,
      "likes": authorsBlogsLikes
    }
  })

  const authorWithMostBlogLikes = authorsBlogLikeCount.reduce((topAuthor, author) => {
    return topAuthor.likes >= author.likes
      ? topAuthor
      : author
  })

  return authorWithMostBlogLikes
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }