describe("Note app", function () {
    beforeEach(function () {
        cy.request({
            method: "post",
            url: `${Cypress.env("BACKEND")}/testing/reset`,
            failOnStatusCode: false,
        });

        const user = {
            name: "Chammy",
            username: "Chammy",
            password: "Chammy",
        };

        cy.request("POST", `${Cypress.env("BACKEND")}/users/`, user);
        cy.visit("");
    });

    it("front page can be opened", function () {
        cy.contains("Notes");
        cy.contains(
            "Note app, Department of Computer Science, University of Helsinki 2023"
        );
    });

    it("login form can be opened", function () {
        cy.contains("log in").click();
        cy.get("#username").type("Chammy");
        cy.get("#password").type("Chammy");
        cy.get("#login-button").click();

        cy.contains("Chammy logged in");
    });

    describe("when logged in", function () {
        beforeEach(function () {
            cy.login({ username: "Chammy", password: "Chammy" });
        });

        it("a new note can be created", function () {
            cy.contains("new note").click();
            cy.get("#new-note").type("a note created by cypress", {
                timeout: 4000,
                force: true,
            });
            cy.contains("save").click({ force: true });
            cy.contains("a note created by cypress");
        });
    });

    describe("and a note exists", function () {
        beforeEach(function () {
            cy.createNote({
                content: "another note cypress",
                important: true,
            });
        });

        it("it can be made not important", function () {
            cy.contains("another note cypress")
                .contains("make not important")
                .click();

            cy.contains("another note cypress").contains("make important");
        });
    });

    it("login fails with wrong password", function () {
        cy.contains("log in").click();
        cy.get("#username").type("mluukkai");
        cy.get("#password").type("wrong");
        cy.get("#login-button").click();

        cy.get(".error")
            .should("contain", "wrong credentials")
            .and("have.css", "color", "rgb(255, 0, 0)")
            .and("have.css", "border-style", "solid");

        cy.get("html").should("not.contain", "Chammy logged in");
    });
});
