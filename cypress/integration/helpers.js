/// <reference types="Cypress" />

export const login = (_baseUrl) => {
  cy.visit("/dashboard")
  cy.get("button").should("be.visible")
  cy.get("button").click()
}