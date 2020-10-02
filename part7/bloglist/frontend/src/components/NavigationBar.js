import { Container, Menu } from 'semantic-ui-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../reducers/loginReducer'
import { useHistory } from 'react-router-dom'

const NavigationBar = () => {
  const [activeItem, setActiveItem] = useState('blogs')
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const history = useHistory()
  const handleItemClick = (path) => (_, { name }) => {
    setActiveItem(name)
    history.push(path)
  }

  const handleLogout = () => {
    dispatch(logout())
    history.push('/')
  }

  return (
    <Container style={{ marginBottom: 30 }}>
      <Menu pointing secondary>
        <Menu.Item
          name='blogs'
          active={activeItem === 'blogs'}
          onClick={handleItemClick('/')}
        >
          Blogs
        </Menu.Item>
        <Menu.Item
          name='users'
          active={activeItem === 'users'}
          onClick={handleItemClick('/users')}
        >
          Users
        </Menu.Item>
        <Menu.Menu position='right'>
          {user ? (
            <>
              <Menu.Item
                name='profile'
                active={activeItem === 'profile'}
                onClick={handleItemClick(`/users/${user.id}`)}
              >
                Logged in as {user.username}
              </Menu.Item>
              <Menu.Item name='logout' onClick={handleLogout}>
                Logout
              </Menu.Item>
            </>
          ) : (
            <Menu.Item
              name='Login'
              active={activeItem === 'Login'}
              onClick={handleItemClick('/login')}
            ></Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
    </Container>
  )
}

export default NavigationBar
