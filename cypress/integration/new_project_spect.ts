import "@testing-library/cypress/add-commands";

describe("New project", () => {
    beforeEach(() => {
        cy.home();
    });

    it("should create a new project", () => {
        cy.fixture("selector.json").then((it) => {
            cy.get(it["new project"])
                .should("exist")
                .click();

            cy.findByText(/create a new project/i)
                .should("exist");

            cy.get(it["project name"])
                .should("be.visible")
                .type("MNIST");

            cy.get(it["project description"])
                .should("be.visible")
                .type(
                    "The MNIST database of handwritten digits, available from this page, has a training set of 60,000 examples, and a test set of 10,000 examples. It is a subset of a larger set available from NIST. The digits have been size-normalized and centered in a fixed-size image."
                );

            cy.get(it["create project"])
                .should("exist")
                .click();
        });
    });

    it("should create a new project with empty name", () => {
        cy.fixture("selector.json").then((it) => {
            cy.get(it["new project"])
                .should("exist")
                .click();

            cy.findByText(/create a new project/i)
                .should("exist");

            cy.get(it["create project"])
                .should("exist")
                .click();

            cy.findByText(/the project name is required/i)
                .should("exist");
        });
    })
});
