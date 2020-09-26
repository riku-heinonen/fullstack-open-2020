import React, { useState } from 'react'
const BlogForm = ({ handleBlogSubmitted }) => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    handleBlogSubmitted({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2> Create new blog </h2>
      <div>
        <div>
          title
          <input
            id='title'
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            id='author'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            id='url'
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
      </div>
      <button id='create-blog-button' type='submit'>
        create
      </button>
    </form>
  )
}

export default BlogForm
