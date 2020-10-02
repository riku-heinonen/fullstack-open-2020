import {
  Button,
  Confirm,
  Container,
  Divider,
  Form,
  Header,
  Icon,
  Label,
  List,
} from 'semantic-ui-react'
import React, { useState } from 'react'
import { addComment, addLike, removeBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const match = useRouteMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    blog: null,
    show: false,
  })

  const likeBlog = () => {
    dispatch(addLike(blog))
  }

  const deleteBlog = () => {
    dispatch(removeBlog(blog))
    setDeleteConfirmation({ blog: null, show: false })
    history.push('/')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (event.target.comment.value) {
      dispatch(addComment(blog.id, event.target.comment.value))
    }
    event.target.comment.value = ''
  }

  const parseTimestamp = (timestamp) => {
    var seconds = Math.floor((new Date() - new Date(timestamp)) / 1000)
    var interval = seconds / 31536000

    if (interval > 1) {
      return Math.floor(interval) + ' years ago'
    }
    interval = seconds / 2592000
    if (interval > 1) {
      return Math.floor(interval) + ' months ago'
    }
    interval = seconds / 86400
    if (interval > 1) {
      const days = Math.floor(interval)
      if (days === 1) {
        return 'yesterday'
      }
      return Math.floor(interval) + ' days ago'
    }
    interval = seconds / 3600
    if (interval > 1) {
      return Math.floor(interval) + ' hours ago'
    }
    interval = seconds / 60
    if (interval > 1) {
      return Math.floor(interval) + ' minutes ago'
    }
    if (seconds < 20) {
      return 'just now'
    }
    return Math.floor(seconds) + ' seconds ago'
  }

  return (
    <>
      <Confirm
        open={deleteConfirmation.show}
        onCancel={() => setDeleteConfirmation({ blog: null, show: false })}
        onConfirm={() => deleteBlog(deleteConfirmation.blog)}
      />
      {blog && (
        <Container
          fluid
          width={'75%'}
          style={{
            padding: 20,
            maxWidth: '75%',
            marginLeft: 'auto',
            marginRight: 'auto',
            border: 'none',
            shadow: 'none',
          }}
        >
          <Header as='h1'>
            {blog.title} by {blog.author || 'unknown'}
          </Header>
          <Header as='h4' style={{ marginTop: -5, marginBottom: 5 }}>
            Added by {blog.user.username}{' '}
          </Header>
          <Divider></Divider>
          <Button fluid basic style={{ marginBottom: 10 }} href={blog.url}>
             {blog.url}
          </Button>
          <div>
            <Button
              as='div'
              labelPosition='left'
              onClick={() => likeBlog(blog)}
            >
              <Label as='a' basic pointing='right'>
                {blog.likes}
              </Label>
              <Button icon basic>
                <Icon name='thumbs up' />
                Like
              </Button>
            </Button>
            {user && user.id === blog.user.id && (
              <Button
                onClick={() =>
                  setDeleteConfirmation({ blog: blog, show: true })
                }
                floated='right'
              >
                <Icon name='trash'></Icon> Delete blog
              </Button>
            )}
          </div>
          <Header as='h2'> Comments </Header>
          <Form onSubmit={handleSubmit}>
            <Form.Group widths='equal'>
              <Form.Input name='comment' placeholder='Add a comment' />
              <Button icon='share'></Button>
            </Form.Group>
          </Form>
          <List celled>
            {blog.comments
              .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
              .map((comment) => (
                <List.Item key={comment.id} style={{ padding: 10 }}>
                  <List.Content floated='right'>
                    {parseTimestamp(comment.createdAt)}
                  </List.Content>
                  <List.Content>{comment.content}</List.Content>
                </List.Item>
              ))}
          </List>
        </Container>
      )}
    </>
  )
}

export default Blog
