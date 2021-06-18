describe("Web-Sprint-Challenge-Single-Page-Applications", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/orderPizza");
  });
});

const nameInput = () => cy.get("input[name=name]");
const pizzaSize = () => cy.get("select").select("size");
const firstTopping = () => cy.get('type="checkbox"').check();
const specialInstructions = () => cy.get("input[name=specialInstructions]");
