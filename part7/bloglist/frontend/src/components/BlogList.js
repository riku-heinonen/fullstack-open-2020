import { Container, List, Loader } from 'semantic-ui-react'

import React from 'react'
import { useHistory } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  const history = useHistory()

  return (
    <>
      {!blogs ? (
        <Loader active inline='centered' />
      ) : (
        <List selection relaxed divided animated verticalAlign='middle'>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <List.Item
                key={blog.id}
                style={{ fontSize: '1.2em' }}
                onClick={() => history.push(`/blogs/${blog.id}`)}
              >
                <Container style={{ marginBottom: 10, marginTop: 10 }}>
                  {blog.title} by {blog.author || 'unknown'}
                </Container>
              </List.Item>
            ))}
        </List>
      )}
    </>
  )
}

export default BlogList
