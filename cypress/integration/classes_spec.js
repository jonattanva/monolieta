import '@testing-library/cypress/add-commands'

describe('The class manager', () => {
    before(() => {
        cy.visit('/')
        cy.title().should('equal', 'Monolieta')
    })

    it('New project!', () => {
        cy.get('[cy="classes"]')
            .should('be.visible')
            .click()

        cy.findByRole('button', {
            name: /new class/i
        })
            .should('be.visible')
            .click()


    })
})
