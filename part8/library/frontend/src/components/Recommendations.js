import React, { useEffect, useState } from 'react'

import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Recommendations = ({ favoriteGenre }) => {
  const result = useQuery(ALL_BOOKS, { variables: { genre: favoriteGenre } })

  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    if (result.data) {
      setRecommendations(result.data.allBooks)
    }
  }, [result.data])

  return (
    <div>
      <div>
        <h2>recommendations</h2>
        {favoriteGenre && (
          <>
            books in your favorite genre <b>{favoriteGenre}</b>
          </>
        )}
      </div>
      {recommendations && (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {recommendations.map(book => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Recommendations
