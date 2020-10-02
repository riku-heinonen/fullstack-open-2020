import { Header, Segment } from 'semantic-ui-react'

import BlogList from './BlogList'
import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const users = useSelector((state) => state.users)
  const allBlogs = useSelector((state) => state.blogs)
  const match = useRouteMatch('/users/:id')
  const user = match ? users.find((user) => user.id === match.params.id) : null
  return (
    <>
      {user && (
        <>
          <Header as='h1'>{user.username}</Header>
          <Header as='h2' attached='top'>
            Added blogs
          </Header>
          <Segment attached style={{ padding: 0 }}>
            <BlogList
              blogs={allBlogs.filter((blog) => blog.user.id === user.id)}
            />
          </Segment>
        </>
      )}
    </>
  )
}

export default User
