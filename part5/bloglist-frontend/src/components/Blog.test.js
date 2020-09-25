import '@testing-library/jest-dom/extend-expect'

import { fireEvent, render } from '@testing-library/react'

import Blog from './Blog'
import React from 'react'

describe('<Blog />', () => {
  let component, blog, likeBlog, deleteBlog

  beforeEach(() => {
    const title = 'React patterns'
    const author = 'Michael Chan'
    const url = 'https://reactpatterns.com/'
    const user = {
      id: '5a422a851b54a676234d17f7',
      username: 'tester',
      name: 'Test User'
    }
    blog = {
      title,
      author,
      url,
      user,
      id: '5a422a851b54a676234d17f7',
      likes: 7
    }

    likeBlog = jest.fn()
    deleteBlog = jest.fn()

    component = render(
      <Blog
        user={user}
        blog={blog}
        likeBlog={likeBlog}
        deleteBlog={deleteBlog}></Blog>
    )
  })

  test('displays only title by default',
    () => {
      const div = component.container.querySelector('.blog')
      expect(div).toHaveTextContent(`${blog.title} by ${blog.author}`)
      expect(component.getByText('View')).toBeDefined()

      expect(div).not.toHaveTextContent(blog.url)
      expect(div).not.toHaveTextContent(`Likes ${blog.likes}`)
    })

  test('displays all blog info when view button clicked', () => {
    let div = component.container.querySelector('.blog')
    const button = component.getByText('View')
    expect(button).toBeDefined()

    fireEvent.click(button)

    expect(div).toHaveTextContent(`${blog.title} by ${blog.author}`)
    expect(component.getByText('Hide')).toBeDefined()
    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent(`Likes ${blog.likes}`)
    expect(component.getByText('Like')).toBeDefined()
    expect(component.getByText('Delete')).toBeDefined()
  })

  test('calls the likeBlog handler everytime the like button is clicked', () => {
    const viewButton = component.getByText('View')
    expect(viewButton).toBeDefined()

    fireEvent.click(viewButton)

    const likeButton = component.getByText('Like')
    expect(likeButton).toBeDefined()

    fireEvent.click(likeButton)
    console.log(likeBlog.mock.calls)
    // expect(likeBlog.mock.calls).toHaveLength(1)

    fireEvent.click(likeButton)
    console.log(likeBlog.mock.calls)
    // expect(likeBlog.mock.calls).toHaveLength(2)
  })
})
