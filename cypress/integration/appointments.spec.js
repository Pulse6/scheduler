describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("it should add", () => {
    cy.request("GET", "/api/debug/reset")
    cy.visit("/");
    cy.contains("li", "Tuesday")
      .click()
    cy.get("[alt=Add]")
      .first()
      .click()
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones")
    cy.get("[alt='Sylvia Palmer']")
      .click()
    cy.contains("button", "Save")
      .click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
    // .should("have.css", "background-color", "rgb(242, 242, 242)");
  });
  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });

    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .first()
      .click({ force: true });
    cy.contains("Confirm")
      .click()
    cy.contains("Deleting")
    cy.contains("Deleting").should("not.exist")

    cy.contains(".appointment__card--show", "Lydia Miller-Jones").should("not.exist")
  });
});
