import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'
import userService from '../services/users'

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data.user
    case 'CLEAR_USER':
      return null
    default:
      return state
  }
}

export const loadUserFromStorage = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('blogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      userService.setToken(user.token)
      dispatch({ type: 'SET_USER', data: { user } })
    }
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('blogListUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userService.setToken(user.token)
      dispatch({ type: 'SET_USER', data: { user } })
      dispatch(
        setNotification(
          `Successfully logged in as ${user.username}`,
          'success',
          3
        )
      )
    } catch (exception) {
      setNotification(
        `Incorrect username or password, please try again`,
        'error',
        3
      )
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('blogListUser')
    dispatch({ type: 'CLEAR_USER' })
  }
}

export default loginReducer
