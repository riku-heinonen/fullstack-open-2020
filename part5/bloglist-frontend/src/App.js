import React, { useEffect, useState } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ user, setUser ] = useState(null)
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('blogListUser', JSON.stringify(user))
      setUser(user)
    } catch (exception) {
      console.error(exception.message)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('blogListUser')
    setUser(null)
  }

  return (
    <div>
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <div>
            {' '}
            Logged in as {user.username}{' '}
            <button onClick={handleLogout}>logout</button>
          </div>
          <h2>blogs</h2>
          {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
        </div>
      )}
    </div>
  )
}

export default App
