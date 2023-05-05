import * as yup from 'yup';

export const schemaUpdatePassword = yup
    .object()
    .shape({
        currentPassword: yup
            .string()
            .required('Password is a required field')
            .min(5, 'Min 5 symbols')
            .matches(/^[0-9a-zA-Z]{5,}$/, 'Password incorrect'),
        newPassword: yup
            .string()
            .required('Password is a required field')
            .min(5, 'Min 5 symbols')
            .matches(/^[0-9a-zA-Z]{5,}$/, 'Password incorrect'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('newPassword')], 'Passwords must match')
    })
    .required();