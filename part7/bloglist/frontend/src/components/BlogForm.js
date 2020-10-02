import { Button, Form, Header } from 'semantic-ui-react'

import React from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const BlogForm = ({ toggleBlogFormVisibility }) => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }
    dispatch(createBlog(newBlog))
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  const handleCancelClick = (event) => {
    event.preventDefault()
    toggleBlogFormVisibility()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Header as='h2'> Create new blog </Header>
      <Form.Group>
        <Form.Input label='Title' name='title'></Form.Input>
        <Form.Input label='Author' name='author'></Form.Input>
        <Form.Input label='URL' name='url'></Form.Input>
      </Form.Group>
      <Button.Group>
        <Button type='submit'>Create</Button>
        <Button style={{ marginLeft: 20 }} onClick={handleCancelClick}>
          Cancel
        </Button>
      </Button.Group>
    </Form>
  )
}

export default BlogForm
