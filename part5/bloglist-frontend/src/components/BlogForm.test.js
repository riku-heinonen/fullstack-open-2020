import '@testing-library/jest-dom/extend-expect'

import { fireEvent, render } from '@testing-library/react'

import BlogForm from './BlogForm'
import React from 'react'

describe('<BlogForm />', () => {
  test('Calls submit handler with the right paramaters', () => {
    const mockSubmitHandler = jest.fn()

    const component = render(
      <BlogForm handleBlogSubmitted={mockSubmitHandler} />
    )

    const title = 'React patterns'
    const author = 'Michael Chan'
    const url = 'https://reactpatterns.com/'

    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')

    fireEvent.change(titleInput, {
      target: { value: title }
    })
    fireEvent.change(authorInput, {
      target: { value: author }
    })
    fireEvent.change(urlInput, {
      target: { value: url }
    })

    const form = component.container.querySelector('form')
    fireEvent.submit(form)

    expect(mockSubmitHandler.mock.calls).toHaveLength(1)
    expect(mockSubmitHandler.mock.calls[0][0]).toEqual({
      title,
      author,
      url
    })
  })
})
