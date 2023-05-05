import * as yup from "yup";

export const schemaRole = yup
  .object()
  .shape({
    roleName: yup
      .string()
      .required("Name is a required field"),
    roleType: yup
      .string()
      .min(1,'Please select at least 1 role type')
      .required('Role type is a required field'),
    rolePermissions: yup
      .array()
      .min(1,'Please select at least 1 permission')
      .required('Role permissions is a required field'),
    })
  .required();
