import * as yup from 'yup';

const emailValidation = yup.object
({
    emailAddress: yup.string()
        .email('Enter valid email address')
        .required('This field is required')
});

const passwordValidation = yup.object
({
    password: yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('This field is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('This field is required'), 
});

const telephoneValidation = yup.object
({
    telephoneNumber: yup.string()
        .required('This field is required')
});

export { emailValidation, passwordValidation, telephoneValidation };