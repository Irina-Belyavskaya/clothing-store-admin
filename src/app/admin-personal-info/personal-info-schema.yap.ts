import * as yup from 'yup';

const phoneRegExp = /^\+375(17|29|33|44)[0-9]{3}[0-9]{2}[0-9]{2}$/;

export const schemaPersonalInfo = yup
    .object()
    .shape({
        firstname: yup.string().required('Firstname is a required field'),
        lastname: yup.string().required('Lastname is a required field'),
        phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone is a required field'),
        address: yup.string().required('Addreess is a required field'),
    })
    .required();