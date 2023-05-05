import * as yup from "yup";

export const schemaProduct = yup
  .object()
  .shape({
    productName: yup
      .string()
      .typeError('Name must be a string')
      .max(20, 'Name must be less than 20 characters')
      .required('Name is a required field'),
    productImage: yup
      .string()
      .typeError('Name must be a string')
      .required('Url is a required field'),
    productPrice: yup
      .number()
      .typeError('Price must be a number')
      .min(0, 'Price must be positive.')
      .required("Price is a required field"),
    productVendorCode: yup
      .string()
      .typeError('Vendor code must be a string')
      .required("Vendor code is a required field"),
    productColor: yup
      .string()
      .typeError('Color must be a string')
      .required("Color is a required field"),
    productSize: yup
      .string()
      .typeError('Size must be a string')
      .required("Size is a required field"),
    productComposition: yup
      .string()
      .typeError('Composition must be a string')
      .required("Composition is a required field"),
    productQuantity: yup
      .number()
      .typeError('Price must be a number')
      .min(0, 'Price must be positive.')
      .required("Quantity is a required field"),
    productBrand: yup
      .string()
      .typeError('Name must be a string')
      .max(30, 'Name must be less than 30 characters')
      .required("Brand is a required field"),
    productDescription: yup
      .string()
      .typeError('Description must be a string')
      .max(100, 'Description must be less than 100 characters')
      .required("Description is a required field"),
    productCategory: yup
      .string()
      .typeError('Category must be a string')
      .required("Category is a required field"),
    })
  .required();
