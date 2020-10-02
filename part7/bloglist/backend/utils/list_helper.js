const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? null
    : blogs.reduce((favorite, blog) => (blog.likes > favorite.likes ? blog : favorite))
}

const mostBlogs = (blogs) => {
  const blogsByAuthor = _(blogs)
    .groupBy('author')
    .toPairs()
    .map(([ author, blogs ]) => ({ author: author, blogs: blogs.length }))
    .value()
  return blogsByAuthor.length === 0
    ? null
    : blogsByAuthor.reduce(
        (mostBlogs, author) => (author.blogs > mostBlogs.blogs ? author : mostBlogs)
      )
}

const mostLikes = (blogs) => {
  const likesByAuthor = _(blogs)
    .groupBy('author')
    .toPairs()
    .map(([ author, blogs ]) => ({
      author: author,
      likes: blogs.reduce((sum, item) => sum + item.likes, 0)
    }))
    .value()
  return likesByAuthor.length === 0
    ? null
    : likesByAuthor.reduce(
        (mostLikes, author) => (author.likes > mostLikes.likes ? author : mostLikes)
      )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
