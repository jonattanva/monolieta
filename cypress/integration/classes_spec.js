const selector = require('../fixtures/selectors.json')
import '@testing-library/cypress/add-commands'

describe('The class manager', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.title().should('equal', 'Monolieta')
    })

    it('search class', () => {
        cy.get(selector.label).should('be.visible').click()

        cy.findByRole('button', { name: /new class/i })
            .should('be.visible')
            .click()

        cy.focused()
            .should('have.attr', 'placeholder', 'Enter class name')
            .type('Dog')

        cy.findByRole('button', { name: /new class/i })
            .should('be.visible')
            .click()

        cy.focused()
            .should('have.attr', 'placeholder', 'Enter class name')
            .type('Cat')

        cy.get('[role="classes"] > div').should('have.length', 2)

        cy.get('[type="search"]')
            .should('have.attr', 'placeholder', 'Search')
            .type('Cat')

        cy.get('[role="classes"] > div').should('have.length', 1)

        cy.get('[role="label"]:nth-child(1) > input[type="text"]').should(
            'have.value',
            'Cat'
        )
    })

    it('sort class', () => {
        cy.get(selector.label).should('be.visible').click()

        cy.findByRole('button', { name: /new class/i })
            .should('be.visible')
            .click()

        cy.focused()
            .should('have.attr', 'placeholder', 'Enter class name')
            .type('Dog')

        cy.findByRole('button', { name: /new class/i })
            .should('be.visible')
            .click()

        cy.focused()
            .should('have.attr', 'placeholder', 'Enter class name')
            .type('Cat')

        cy.get('[role="classes"] > div').should('have.length', 2)

        cy.get(selector.sort).click()

        cy.get('[role="label"]:nth-child(1) > input[type="text"]').should(
            'have.value',
            'Dog'
        )

        cy.get('[role="label"]:nth-child(2) > input[type="text"]').should(
            'have.value',
            'Cat'
        )
    })

    it('add new class', () => {
        cy.get(selector.label).should('be.visible').click()

        cy.findByRole('button', { name: /new class/i })
            .should('be.visible')
            .click()

        cy.focused()
            .should('have.attr', 'placeholder', 'Enter class name')
            .type('Cat')

        cy.get('[role="classes"] > div').should('have.length', 1)
    })

    it('delete class', () => {
        cy.get(selector.label).should('be.visible').click()

        cy.findByRole('button', { name: /new class/i })
            .should('be.visible')
            .click()

        cy.focused()
            .should('have.attr', 'placeholder', 'Enter class name')
            .type('Dog')

        cy.findByRole('input').click()

        cy.get('[role="classes"] > div').should('have.length', 1)

        cy.get(selector.trash).click()

        cy.get('[role="classes"] > div').should('have.length', 0)
    })
})
