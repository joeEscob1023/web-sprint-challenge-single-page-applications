describe("Web-Sprint-Challenge-Single-Page-Applications", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/orderPizza");
  });
});

const nameInput = () => cy.get("input[name=name]");
const pizzaSize = () => cy.get("select").select("size");
const firstTopping = () => cy.get('type="checkbox"').check();
const specialInstructions = () => cy.get("input[name=specialInstructions]");
const submitButton = () => cy.get("button[id=order-button]");

it("the proper elements should be showing", () => {
  nameInput().should("exist");
  pizzaSize().should("exist");
  firstTopping().should("exist");
  specialInstructions().should("exist");
});

it("submit button starts out disabled", () => {
  submitButton.should("be.disabled");
});

it("can type in the inputs", () => {
  nameInput()
    .should("have.value", "")
    .type("John Doe")
    .should("have.value", "John Doe");
  specialInstructions()
    .should("have.value", "")
    .type("Please leave at front door")
    .should("have.value", "Please leave at front door");
});

it("can check in and uncheck the inputs", () => {
  firstTopping().should("be.checked");

  firstTopping();
});

it("can be a dropdown", () => {
  pizzaSize().should("have.value", "small");
});

it("The submit button enables when all fields are filled out", () => {
  nameInput().type("John Doe");
  pizzaSize().select("small");
  firstTopping().checked();
});

describe("Adding a new order", () => {
  it("can submit order", () => {
    nameInput().type("Jane Doe");
    pizzaSize().select("large");
    firstTopping().check();
    specialInstructions().type("Please leave at front door");
    submitButton().click();
  });
});
