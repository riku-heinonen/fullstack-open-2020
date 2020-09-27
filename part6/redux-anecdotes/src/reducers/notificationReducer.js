const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      if (state) {
        clearTimeout(state.timeoutID)
      }
      return action.data
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    const timeoutID = setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION' })
    }, seconds * 1000)
    dispatch({ type: 'SET_NOTIFICATION', data: { message, timeoutID } })
  }
}

export default notificationReducer
