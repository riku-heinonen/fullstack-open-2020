import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data.users
    case 'CREATE_USER':
      return [...state, action.data.user]
    default:
      return state
  }
}

export const createUser = (user) => {
  return async (dispatch) => {
    const createdUser = await userService.create(user)
    dispatch({
      type: 'CREATE_USER',
      data: { user: createdUser },
    })
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: { users },
    })
  }
}

export default userReducer
