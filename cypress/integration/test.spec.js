describe(`Dashboard DE`, () => {
  it(`should login and go to dashboard DE`, () => {
    cy.visit("https://www.google.com")
    cy.get('div').should(`exist`)
  })
})