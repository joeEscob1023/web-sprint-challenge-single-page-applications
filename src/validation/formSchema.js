import * as yup from "yup";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(2, "Name must be 3 characters long"),
  specialInstructions: yup.string(),
  size: yup.string().required().oneOf(["small", "medium", "large", "XL"]),
  pepperoni: yup.boolean(),
  sausage: yup.boolean(),
  olives: yup.boolean(),
  bellpeppers: yup.boolean(),
});

export default formSchema;
