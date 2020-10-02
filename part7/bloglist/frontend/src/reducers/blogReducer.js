import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'REPLACE_BLOG':
      return state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      )
    case 'REMOVE_BLOG':
      return state.filter((blog) => blog.id !== action.data.id)
    default:
      return state
  }
}

export const addLike = (blog) => {
  return async (dispatch) => {
    const updatedblog = await blogService.replace({
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch({ type: 'REPLACE_BLOG', data: updatedblog })
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create(blog)
      dispatch({
        type: 'CREATE_BLOG',
        data: createdBlog,
      })
      dispatch(setNotification(`Added blog ${blog.title}`, 'success', 3))
    } catch (exception) {
      dispatch(setNotification('Blog title and URL are required', 'error', 3))
    }
  }
}

export const addComment = (blogID, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(blogID, comment)
    dispatch({ type: 'REPLACE_BLOG', data: updatedBlog })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      dispatch({ type: 'REMOVE_BLOG', data: { id: blog.id } })
      dispatch(setNotification(`Deleted blog ${blog.title}`, 'success', 3))
    } catch (e) {
      dispatch(
        setNotification('You can only delete your own blogs', 'error', 3)
      )
    }
  }
}
export default blogReducer
