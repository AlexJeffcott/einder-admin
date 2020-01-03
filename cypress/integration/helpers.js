/// <reference types="Cypress" />

export const login = (baseUrl) => {
  cy.visit(baseUrl)
  cy.get("button").should("be.visible")
  cy.get("button").click()
}