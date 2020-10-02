import { Button, Container, Form, Segment } from 'semantic-ui-react'

import React from 'react'
import { login } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const handleSubmit = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    console.log(username, password)
    if (!username || !password) {
      dispatch(
        setNotification('Username and password are required', 'error', 3)
      )
    } else {
      dispatch(login(username, password))
      event.target.username.value = ''
      event.target.password.value = ''
      history.push('/')
    }
  }

  return (
    <Container style={{ width: '50%' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Username' name='username'></Form.Input>
          <Form.Input
            fluid
            label='Password'
            name='password'
            type='password'
          ></Form.Input>
        </Form.Group>
        <Segment basic textAlign={'center'}>
          <Button style={{ textAlign: 'center' }} type='submit'>
            Login
          </Button>
        </Segment>
      </Form>
    </Container>
  )
}

export default LoginForm
