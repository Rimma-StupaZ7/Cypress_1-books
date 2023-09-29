beforeEach(() => {
  cy.visit("/");
});

describe("Login on page", () => {
  it("page visible", () => {
    cy.contains("Books list").should("be.visible");
  });

  it("should login in success", () => {
    cy.login("bropet@mail.ru", "123");
    cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible");
  });

  it("should not login with empty mail", () => {
    cy.login(null, "123");
    cy.get("#mail").then((elements) => {
      expect(elements[0].checkValidity()).be.false;
      expect(elements[0].validationMessage).contains("Заполните это поле");
    });
  });

  it("should not login with empty pass", () => {
    cy.login("bropet@mail.ru", null);
    cy.get("#pass").then((elements) => {
      expect(elements[0].checkValidity()).be.false;
      expect(elements[0].validationMessage).contains("Заполните это поле");
    });
  });
});

describe("BooksApp tests", () => {
  beforeEach(() => {
    cy.login("bropet@mail.ru", "123");
  });

  it("should add a new book", () => {
    cy.addBook("Book_1", "Author_1");
    cy.contains("Book_1").should("be.visible");
  });

  it("should add a book to favorites", () => {
    cy.contains("Book_1").should("be.visible");
    cy.contains("Add to favorite").first().click();
    cy.contains("Favorites").click();
    cy.contains("Delete from favorite").first().should("be.visible");
  });

  it("should delete the book from favorites", () => {
    cy.contains("Favorites").click();
    cy.contains("Book_1").should("be.visible");
    cy.contains("Delete from favorite").first().click();
    cy.contains("Please add some book to favorit on home page!").should(
      "be.visible"
    );
  });
});
