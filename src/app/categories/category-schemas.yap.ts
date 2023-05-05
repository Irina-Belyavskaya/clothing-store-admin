import * as yup from "yup";

export const schemaCreateCategory = yup
  .object()
  .shape({
    name: yup
      .string()
      .max(40, "Name must be less than 100 characters")
      .required("Name is a required field"),
    description: yup
      .string()
      .max(100, "Max 100 symbols")
      .required("Description is a required field"),
    image: yup
      .string()
      .required("Description is a required field"),
  })
  .required();
