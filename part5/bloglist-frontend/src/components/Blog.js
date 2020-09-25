import React, { useState } from 'react'

import PropTypes from 'prop-types'

const Blog = ({ user, blog, likeBlog, deleteBlog }) => {
  const [ showDetails, setShowDetails ] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 2,
    marginBottom: 2,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    borderRadius: 5
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div style={blogStyle} className='blog'>
      {showDetails ? (
        <div>
          <div>
            {blog.title} by {blog.author}
            <button style={{ paddingLeft: 10 }} onClick={toggleDetails}>
              Hide
            </button>
          </div>
          <div>{blog.url}</div>
          <div>
            Likes {blog.likes} <button onClick={likeBlog(blog)}> Like </button>
          </div>
          {user.id === blog.user.id ? (
            <div>
              <button onClick={deleteBlog(blog)}> Delete </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div>
          {blog.title} by {blog.author} <button onClick={toggleDetails}> View </button>
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
