import React, { useEffect, useState } from 'react'

import { SET_BIRTHYEAR } from '../mutations'
import Select from 'react-select'
import { useMutation } from '@apollo/client'

const Authors = ({ authors, setErrorMessage, updateAuthorsCache }) => {
  const [birthYear, setBirthYear] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState(null)

  const [setAuthorBirthYear, mutationResult] = useMutation(SET_BIRTHYEAR, {
    onError: (error) => {
      console.error(error)
      setErrorMessage(error.graphQLErrors[0]?.message)
    },
    update: (store, response) => {
      const editedAuthor = response.data.editAuthor
      updateAuthorsCache(editedAuthor)
    },
  })

  useEffect(() => {
    if (mutationResult.data && mutationResult.data.editAuthor === null) {
      setErrorMessage('No such author')
    }
  }, [mutationResult, setErrorMessage])

  const submit = (event) => {
    event.preventDefault()
    if (selectedAuthor && birthYear) {
      setAuthorBirthYear({
        variables: { name: selectedAuthor.value, setBornTo: Number(birthYear) },
      })
    } else {
      setErrorMessage('All form fields must be non-empty')
    }
    setSelectedAuthor(null)
    setBirthYear('')
  }

  return (
    <>
      {authors && (
        <div>
          <div>
            <h2>authors</h2>
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th>born</th>
                  <th>books</th>
                </tr>
                {authors.map((a) => (
                  <tr key={a.name}>
                    <td>{a.name}</td>
                    <td>{a.born}</td>
                    <td>{a.bookCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2> Set birthyear </h2>
          <form onSubmit={submit}>
            <div>
              Name
              <Select
                defaultValue={selectedAuthor}
                onChange={setSelectedAuthor}
                options={authors.map((author) => ({
                  value: author.name,
                  label: author.name,
                }))}
              />
            </div>
            <div>
              Born
              <input
                value={birthYear}
                onChange={({ target }) => setBirthYear(target.value)}
              />
            </div>
            <button type='submit'> Update author </button>
          </form>
        </div>
      )}
    </>
  )
}

export default Authors
