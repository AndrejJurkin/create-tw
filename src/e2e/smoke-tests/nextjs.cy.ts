describe("Next.js", () => {
  it("Matches snapshot", () => {
    cy.visit("http://localhost:3000");

    cy.get("h1").contains("Welcome to Next.js!");
    // cy.percySnapshot();
  }
})