describe('Session edit e2e test', () => {
  const teachers = [
    {
      id: 1,
      lastName: "Doe",
      firstName: "John",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      lastName: "Dupont",
      firstName: "Louis",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]
  it('Edit a session', () => {

    let sessionUsers: Number[] = [];

    cy.visit('/login')

    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: 1
      },
    })

      cy.intercept(
        {
          method: 'GET',
          url: '/api/session',
        },
        [
          {
            id: 1,
            name: "A session name",
            date: new Date(),
            teacher_id: 1,
            description: "A small description",
            users:[],
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]).as('session')


      cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)


    cy.intercept('GET', '/api/teacher', {
      body:
      teachers
    })

    cy.intercept('POST', '/api/session', {
      status: 200,
    })

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session/1',
      },
      {
        id: 1,
        name: "Test",
        date: new Date(),
        teacher_id: 1,
        description: "A small description",
        users:[],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ).as('session')

    cy.intercept('PUT', '/api/session/1', {
      status: 200,

    })


    cy.get('button span span').contains("Edit").click()

    cy.url().should('include', '/sessions/update/1')


    cy.get('input[formControlName=name]').clear()
    cy.get('input[formControlName=name]').type("A session name")
    cy.get('button[type=submit]').click()

    cy.url().should('include', '/sessions')
  })
});
