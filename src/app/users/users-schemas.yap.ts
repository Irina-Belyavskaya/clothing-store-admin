import * as yup from 'yup';

export const schemaUserRole = yup
    .object()
    .shape({
        role: yup.string().required('Role is a required field'),
    })
    .required();

export const schemaUserSatus = yup
    .object()
    .shape({
        status: yup.boolean().required('Status is a required field'),
    })
    .required();