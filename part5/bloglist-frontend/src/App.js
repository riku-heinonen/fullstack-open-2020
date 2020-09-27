import React, { useEffect, useRef, useState } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ user, setUser ] = useState(null)
  const [ notification, setNotification ] = useState({
    message: null,
    type: null
  })
  const blogFormRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const setSuccessNotification = (message) => {
    setNotification({ message, type: 'success' })
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 3000)
  }

  const setErrorNotification = (message) => {
    setNotification({ message, type: 'error' })
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 3000)
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('blogListUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setSuccessNotification(`Successfully logged in as ${user.username}`)
    } catch (exception) {
      setErrorNotification('Invalid username or password')
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('blogListUser')
    setUser(null)
  }

  const handleBlogSubmitted = async (blog) => {
    try {
      const addedBlog = await blogService.create(blog)
      setBlogs(blogs.concat(addedBlog))
      blogFormRef.current.toggleVisibility()
      setSuccessNotification(
        `New blog '${addedBlog.title}' by ${addedBlog.author} added`
      )
    } catch (exception) {
      setErrorNotification('Failed to create blog')
    }
  }

  const likeBlog = (blogToLike) => async () => {
    try {
      const updatedBlog = await blogService.replace({
        ...blogToLike,
        likes: blogToLike.likes + 1
      })
      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      )
    } catch (exception) {
      console.error(exception)
    }
  }

  const deleteBlog = (blogToDelete) => async () => {
    const confirmDeletion = window.confirm(`Delete blog ${blogToDelete.title}?`)
    if (confirmDeletion) {
      try {
        await blogService.remove(blogToDelete.id)
        setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id))
      } catch (exception) {
        setErrorNotification('You can only delete your own blogs')
      }
    }
  }

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <div>
            {' '}
            Logged in as {user.username}{' '}
            <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel={'New blog'} ref={blogFormRef}>
            <BlogForm handleBlogSubmitted={handleBlogSubmitted} />
          </Togglable>
          <h2>blogs</h2>
          <div id='blogList'>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog
                  user={user}
                  key={blog.id}
                  blog={blog}
                  likeBlog={likeBlog}
                  deleteBlog={deleteBlog}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
