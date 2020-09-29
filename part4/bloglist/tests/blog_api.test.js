const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, blogsInDb } = require('./test_helper')

describe('blog api', () => {
  let token

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const promiseArray = []
    const username = 'root'
    const password = 'sekret'
    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({ username: 'root', passwordHash })
    promiseArray.push(user.save())

    const blogObjects = initialBlogs.map(
      (blog) => new Blog({ ...blog, user: user._id })
    )
    blogObjects.forEach((blog) => promiseArray.push(blog.save()))

    await Promise.all(promiseArray)

    const response = await api
      .post('/api/login')
      .send({ username, password })
      .expect(200)
    token = response.body.token
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('the corrent amount of blogs is returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('blog unique identifier is called `id`', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0]._id).toBeUndefined()
    expect(response.body[0].id).toBeDefined()
  })

  test('blog is saved to database', async () => {
    const newBlog = {
      author: 'New author',
      title: 'New title',
      url: 'http://some.url',
      likes: 10000,
    }
    let response = await api
      .post('/api/blogs')
      .auth(token, { type: 'bearer' })
      .send(newBlog)
      .expect(201)
    const { author, title, url, likes } = response.body
    expect({ author, title, url, likes }).toEqual(newBlog)

    response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)
  })

  test('unauthorized is returned if posting without token', async () => {
    const newBlog = {
      author: 'New author',
      title: 'New title',
      url: 'http://some.url',
      likes: 10000,
    }
    let response = await api.post('/api/blogs').send(newBlog).expect(401)
    expect(response.body.error).toEqual('invalid token')

    response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('blog likes default to 0 if not specified', async () => {
    const newBlog = {
      author: 'New author',
      title: 'New title',
      url: 'http://some.url',
    }

    const response = await api
      .post('/api/blogs')
      .auth(token, { type: 'bearer' })
      .send(newBlog)
      .expect(201)
    expect(response.body.likes).toEqual(0)
  })

  test('bad request is returned if posting blog without url or title', async () => {
    const blogWithoutTitle = {
      author: 'New author',
      url: 'http://some.url',
    }

    await api
      .post('/api/blogs')
      .auth(token, { type: 'bearer' })
      .send(blogWithoutTitle)
      .expect(400)

    const blogWithoutUrl = {
      author: 'New author',
      title: 'New title',
    }

    await api
      .post('/api/blogs')
      .auth(token, { type: 'bearer' })
      .send(blogWithoutUrl)
      .expect(400)
  })

  test('blog is deleted from databased', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .auth(token, { type: 'bearer' })
      .expect(204)

    const blogsAfterDeletion = await blogsInDb()
    expect(blogsAfterDeletion.length).toEqual(blogsAtStart.length - 1)
    expect(blogsAtStart).toContainEqual(blogToDelete)
    expect(blogsAfterDeletion).not.toContainEqual(blogToDelete)
  })

  test('blog contents are updated correctly', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog = {
      author: 'Updated author',
      title: 'Updated title',
      url: 'http://updated.url',
      likes: blogToUpdate.likes + 10,
    }
    let response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
    expect(response.body).toEqual({
      ...updatedBlog,
      id: blogToUpdate.id,
      user: blogToUpdate.user,
    })
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})
