import React from "react";

const OrderForm = (props) => {
  const { values, submit, change, disabled, errors } = props;

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  const onChange = (evt) => {
    const { name, value, checked, type } = evt.target;
    const valueToUse = type === "checkbox" ? checked : value;
    change(name, valueToUse);
  };

  return (
    <form id="pizza-form" onSubmit={onSubmit}>
      <div className="form-group">
        <h2>Place Your Order</h2>
        <button disabled={disabled}>Submit</button>
        <div className="errors">
          <div>{errors.name}</div>
          <div>{errors.size}</div>
        </div>
      </div>
      <div className="form-group">
        <h4>Please Enter Your Name and Pizza Info</h4>
        <label>
          Name&nbsp;
          <input
            value={values.name}
            onChange={onChange}
            name="name"
            type="text"
          />
        </label>
        <label>
          <select onChange={onChange} value={values.size} name="size">
            <option value="">Select a Size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="XL">XL</option>
          </select>
        </label>
      </div>
      <div className="form-group">
        <label>
          Pepperoni
          <input
            type="checkbox"
            name="pepperoni"
            checked={values.pepperoni}
            onChange={onChange}
          />
        </label>
        <label>
          Sausage
          <input
            type="checkbox"
            name="sausage"
            checked={values.sausage}
            onChange={onChange}
          />
        </label>
        <label>
          Olives
          <input
            type="checkbox"
            name="olives"
            checked={values.olives}
            onChange={onChange}
          />
        </label>
        <label>
          Bell Peppers
          <input
            type="checkbox"
            name="bellpeppers"
            checked={values.bellpeppers}
            onChange={onChange}
          />
        </label>
      </div>
      <div className="form-group specialInstructions">
        <label>
          Special Instructions
          <input
            type="text"
            name="specialInstructions"
            onChange={onChange}
            value={values.specialInstructions}
          />
        </label>
      </div>
    </form>
  );
};

export default OrderForm;
