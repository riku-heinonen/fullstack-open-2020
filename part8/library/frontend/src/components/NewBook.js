import React, { useState } from 'react'

import { ADD_BOOK } from '../mutations'
import { useMutation } from '@apollo/client'

const NewBook = ({ setErrorMessage, updateBooksCache, updateAuthorsCache }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      console.error(error)
      setErrorMessage(error.graphQLErrors[0]?.message)
    },
    update: (store, response) => {
      const addedBook = response.data.addBook
      console.log(addedBook)
      updateBooksCache(addedBook)
      updateAuthorsCache(addedBook.author)
    },
  })

  const submit = async (event) => {
    event.preventDefault()
    if (title && author && published && genres) {
      createBook({
        variables: {
          title,
          author,
          published: Number(published),
          genres,
        },
      })
    } else {
      setErrorMessage('All form fields must be non-empty')
    }

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    if (genre !== '') {
      setGenres(genres.concat(genre))
    }
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
