import React from "react";

const Order = ({ details }) => {
  console.log(details.toppings);
  //Cant figure out how to get the toppings to show even after making them an array in App.js
  return (
    <div>
      <h2>Customers Name: {details.name}</h2>
      <p>Pizza Size: {details.size}</p>

      {!!details.toppings && !!details.toppings.length && (
        <div>
          Toppings:
          <ul>
            {details.toppings.map((topping, index) => {
              return <li key={index}> {topping}</li>;
            })}
          </ul>
        </div>
      )}
      <p>Special Instructions: {details.specialInstructions}</p>
    </div>
  );
};

export default Order;
