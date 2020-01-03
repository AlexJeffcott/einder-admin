/// <reference types="Cypress" />
import { login } from './helpers'
const {BASE_URL, LOCAL} = Cypress.env()

describe('Login Page', () => {
  it('should go to login page', () => {
    login(BASE_URL)
    cy.get('[data-cy=set_light_theme]').should('be.visible')
    cy.get('[data-cy=set_dark_theme]').should('be.visible')
    cy.get('[data-cy=set_default_theme]').should('be.visible')
  })
})