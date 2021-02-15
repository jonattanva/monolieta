const selector = require('../fixtures/selectors.json')

describe('The project manager', () => {
    before(() => {
        cy.visit('/')
        cy.title().should('equal', 'Monolieta')
    })

    it('New project!', () => {
        cy.get(selector.menu)
            .should('be.visible')
            .click()
            .get(selector.project.new)
            .should('contain.text', 'New Project')
            .click()
            .get(selector.project.input.name)
            .type('demo project')
            .get(selector.project.input.id)
            .should('not.have.value', '')
            .get(selector.project.input.create)
            .click()
    })
})
