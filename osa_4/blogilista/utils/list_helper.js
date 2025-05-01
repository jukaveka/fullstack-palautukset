const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  
  const likesReducer = (totalCount, blogLikes) => {
    totalCount + likes
  }

  const likes = blogs.reduce(likesReducer, 0)

  return likes
}

module.exports = { dummy, totalLikes }