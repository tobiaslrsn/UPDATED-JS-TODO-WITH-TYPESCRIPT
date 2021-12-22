describe("todo list tests", () => {
  it("this should add something to the todo-list", () => {
    //Arrange - Förbered
    cy.visit("http://localhost:1234");

    cy.get("input#todo-input-field").type("hej");
    cy.get("button#add-todo").click();
    cy.get("button#sort-todos");
    cy.get("ul li").should("have.length", 4);
    //Act - Gör något
    cy.get("ul li:first .remove-todo p.remove-todo-paragraph").click();
    cy.get("p:first.check-todo-paragraph").click();

    cy.get("button#sort-todos").click();
    //Assert - Verifiera
    cy.get("ul li").should("have.length", 3);
  });
});
