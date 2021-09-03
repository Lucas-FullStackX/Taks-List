describe("Taks List", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("Website open", () => {
    cy.contains("TAKS LIST");
  });
  it("Create Tak", () => {
    cy.get("input").first().type("play the guitar").type("{enter}");
  });
});
describe("Taks List", () => {
  it("Delete Tak", () => {
    cy.get('[data-test-id="text"]').first().trigger("mouseover").click();
    cy.get('[data-test-id="delete"]').first().trigger("mouseover").click();
  });
  it("Complete Tak", () => {
    cy.get('[data-test-id="completed"]').first().click();
  });
  it("Edit Tak", () => {
    cy.get('[data-test-id="edit"]').first().click();
    cy.get('[data-test-id="inputEdit"]')
      .first()
      .click()
      .type("play the piano")
      .type("{enter}");
    cy.contains("play the piano");
  });
});
