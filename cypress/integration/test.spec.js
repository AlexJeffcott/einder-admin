/// <reference types="Cypress" />
import { login } from './helpers'
const {baseUrl, LOCAL} = Cypress.env()

describe('Login Page', () => {
  it('should go to login page', () => {
    login(baseUrl)
    cy.get('[data-cy=set_light_theme]').should('be.visible')
    cy.get('[data-cy=set_dark_theme]').should('be.visible')
    cy.get('[data-cy=set_default_theme]').should('be.visible')
  })
})