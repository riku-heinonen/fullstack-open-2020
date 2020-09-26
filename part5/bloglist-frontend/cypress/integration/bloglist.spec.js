describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy
      .request('POST', 'http://localhost:3001/api/users', {
        name: 'Test User',
        username: 'testuser',
        password: 'secretpw',
      })
      .then((response) => {
        cy.visit('http://localhost:3000')
      })
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('secretpw')
      cy.get('#login-button').click()

      cy.get('.notification').contains('Successfully logged in as testuser')
      cy.contains('logout')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wronguser')
      cy.get('#password').type('secretpw')
      cy.get('#login-button').click()

      cy
        .get('.notification')
        .contains('Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'secretpw' })
    })

    it('A blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('React patterns')
      cy.get('#author').type('Michael Chan')
      cy.get('#url').type('https://reactpatterns.com/')
      cy.get('#create-blog-button').click()

      cy
        .get('.notification')
        .contains(`New blog 'React patterns' by Michael Chan added`)
      cy.contains('React patterns by Michael Chan')
      cy.contains('View')
    })

    it('A blog can be liked', function() {
      cy.createBlog({
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
      })
      cy.contains('View').click()
      cy.contains('Likes 0')
      cy.contains('Like').click()
      cy.contains('Likes 1')
    })

    it('A blog can be deleted', function() {
      cy.createBlog({
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
      })
      cy.contains('View').click()
      cy.contains('Delete').click()

      cy.get('html').should('not.contain', 'React patterns by Michael Chan')
    })

    it('A blog can not be deleted by another user', function() {
      cy.createBlog({
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
      })
      cy.contains('View').click()
      cy.contains('Delete')
      cy.contains('logout').click()
      cy
        .request('POST', 'http://localhost:3001/api/users', {
          name: 'Another User',
          username: 'anotheruser',
          password: 'secretpw',
        })
        .then((response) => {
          cy.login({ username: 'anotheruser', password: 'secretpw' })
        })
      cy.contains('View').click()
      cy.get('html').should('not.contain', 'Delete')
    })

    it.only('Blogs are returned in decreasing order by likes', function() {
      cy.fixture('mockBlogs').then((blogs) => {
        blogs.forEach((blog) => cy.createBlog(blog))
        blogs.forEach((blog) => cy.contains(`${blog.title} by ${blog.author}`))
      })
      cy.get('.view-button').each((button) => cy.wrap(button).click())

      cy.get('.blog-likes').then((blogs) => {
        const orderedLikes = [ ...blogs ].map((blog) =>
          Number(blog.textContent.split(' ')[1])
        )
        for (let i = 0; i < orderedLikes.length; i++) {
          if (i > 0) {
            expect(orderedLikes[i - 1]).to.be.above(orderedLikes[i])
          }
        }
      })
    })
  })
})
