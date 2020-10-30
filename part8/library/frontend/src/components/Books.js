import React, { useEffect, useState } from 'react'

import { ALL_BOOKS } from '../queries'
import { useLazyQuery } from '@apollo/client'

const Books = ({ allBooks }) => {
  const [getBooksByGenre, booksResult] = useLazyQuery(ALL_BOOKS)
  const [selectedGenre, setSelectedGenre] = useState(null)

  const allGenres = allBooks ? [...new Set(allBooks.map(book => book.genres).flat())] : []

  const books = selectedGenre ? booksResult.data?.allBooks : allBooks

  useEffect(() => {
    if (selectedGenre) {
      getBooksByGenre({ variables: { genre: selectedGenre } })
    }
  }, [selectedGenre, getBooksByGenre])

  return (
    <>
      <div>
        <h2>books</h2>
        {selectedGenre && <h3>in genre {selectedGenre}</h3>}
        {books && (
          <div>
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th>author</th>
                  <th>published</th>
                </tr>
                {books.map(a => (
                  <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div>
          <h3> Filter by genre </h3>
          {allGenres.map(genre => (
            <span key={genre} style={{ paddingRight: 20 }}>
              {genre}
              <input
                name='genre'
                type='checkbox'
                value={genre}
                checked={genre === selectedGenre}
                onChange={() =>
                  genre === selectedGenre ? setSelectedGenre(null) : setSelectedGenre(genre)
                }
              />
            </span>
          ))}
        </div>
      </div>
    </>
  )
}

export default Books
