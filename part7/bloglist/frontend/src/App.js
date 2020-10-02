import { Button, Container, Header, Segment } from 'semantic-ui-react'
import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import NavigationBar from './components/NavigationBar'
import Notification from './components/Notification'
import User from './components/User'
import UserList from './components/UserList'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { loadUserFromStorage } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()
  const [blogFormVisible, setBlogFormVisibility] = useState(false)

  const toggleBlogFormVisibility = () => {
    setBlogFormVisibility(!blogFormVisible)
  }

  useEffect(() => {
    dispatch(loadUserFromStorage())
    dispatch(initializeUsers())
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  return (
    <>
      <NavigationBar />
      <Container>
        <Notification />
        <Switch>
          <Route path='/login'>
            <LoginForm />
          </Route>
          <Route path='/users/:id'>
            <User />
          </Route>
          <Route path='/users'>
            <UserList />
          </Route>
          <Route path='/blogs/:id'>
            <Blog></Blog>
          </Route>
          <Route path='/'>
            {user &&
              (blogFormVisible ? (
                <BlogForm toggleBlogFormVisibility={toggleBlogFormVisibility} />
              ) : (
                <Button onClick={toggleBlogFormVisibility}>
                  Create a new blog
                </Button>
              ))}
            <Header attached='top' block as='h1'>
              Blogs
            </Header>
            <Segment attached style={{ padding: 0 }}>
              <BlogList blogs={blogs} />
            </Segment>
          </Route>
        </Switch>
      </Container>
    </>
  )
}

export default App
