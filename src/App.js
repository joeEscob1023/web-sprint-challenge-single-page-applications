import React, { useState, useEffect } from "react";
import { Route, Link, Switch } from "react-router-dom";
import OrderForm from "./Components/OrderForm";
import Order from "./Components/Order";
import axios from "axios";
import * as yup from "yup";
import schema from ".//validation/formSchema";

const initialFormValues = {
  name: "",
  //dropdown
  size: "",
  //checkbox
  pepperoni: false,
  sausage: false,
  olives: false,
  bellpeppers: false,
  specialInstructions: "",
};

const initialFormErrors = {
  name: "",
  size: "",
};

const initialOrders = [];
const initialDisabled = true;

const App = () => {
  const [orders, setOrders] = useState(initialOrders); // array of user objects
  const [formValues, setFormValues] = useState(initialFormValues); // object
  const [formErrors, setFormErrors] = useState(initialFormErrors); // object
  const [disabled, setDisabled] = useState(initialDisabled); // boolean

  const getOrders = () => {
    axios
      .get("http://buddies.com/api/friends")
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postNewOrder = (newOrder) => {
    axios
      .post("http://buddies.com/api/friends", newOrder)
      .then((res) => {
        setOrders(res.data, ...orders);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setFormValues(initialFormValues);
      });
  };

  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: "" }))
      .catch((err) => setFormErrors({ ...formErrors, [name]: err.errors[0] }));
  };

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const formSubmit = () => {
    const newOrder = {
      name: formValues.name.trim(),
      size: formValues.size.trim(),
      specialInstructions: formValues.specialInstructions.trim(),
      toppings: ["pepperoni", "sausage", "olives", "bellpeppers"].filter(
        (topping) => formValues[topping]
      ),
    };
    postNewOrder(newOrder);
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    schema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);

  return (
    <>
      <nav>
        <h1>Lambda Eats</h1>
        <div>
          <Link to="/">Home</Link>{" "}
          <Link id="orderPizza" to="/orderPizza">
            Order Pizza!
          </Link>
        </div>
      </nav>
      <Switch>
        <Route
          path="/orderPizza"
          render={(props) => {
            return (
              <OrderForm
                {...props}
                values={formValues}
                change={inputChange}
                submit={formSubmit}
                disabled={disabled}
                errors={formErrors}
              />
            );
          }}
        />
        {orders.map((order) => {
          return <Order key={order.id} details={order} />;
        })}
      </Switch>
    </>
  );
};
export default App;
