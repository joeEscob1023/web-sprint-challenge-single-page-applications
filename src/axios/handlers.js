import { v4 as uuid } from "uuid";
import { rest } from "msw";

const orders = [
  {
    id: uuid(),
    name: "Joseph Escobedo",
    size: "medium",
    specialInstructions: "Please leave pizza at the front door.",
    toppings: ["pepperoni", "olives", "sausage"],
  },
];

function getAllOrders(req, res, ctx) {
  return res(ctx.status(200), ctx.json(orders));
}

function createNewOrder(req, res, ctx) {
  const { name, size, specialInstructions } = req.body;
  const requiredFields = { name, size, specialInstructions };

  if (Object.values(requiredFields).some((field) => !field || !field.trim())) {
    return res(
      ctx.status(400),
      ctx.json({ message: "Some required fields are missing or invalid." })
    );
  }

  if (req.body.toppings && !Array.isArray(req.body.toppings)) {
    return res(
      ctx.status(400),
      ctx.json({ message: "The optional `toppings` field must be an array." })
    );
  }

  const newOrder = { id: uuid(), ...req.body };
  orders.unshift(newOrder);

  return res(ctx.status(201), ctx.json(newOrder));
}

export const handlers = [
  rest.get("http://buddies.com/api/friends", getAllOrders),
  rest.post("http://buddies.com/api/friends", createNewOrder),
];
