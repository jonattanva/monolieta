import "@testing-library/cypress/add-commands";

Cypress.Commands.add("home", () => {
    cy.visit("/");
    cy.title().should("equal", "Monolieta");
});
