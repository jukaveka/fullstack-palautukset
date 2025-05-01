const { countBy, groupBy, iteratee } = require("lodash")

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
  const getName = iteratee("author")
  const groupedAuthors = groupBy(blogs, getName)
  
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


const mostBlogs = (blogs) => {
  return blogs.length === 0
    ? 0
    : findAuthorWithMostBlogs(blogs)
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs }