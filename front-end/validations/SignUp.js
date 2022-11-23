import * as yup from 'yup';

const SignUpSchema = yup.object
({
    fullName: yup.string()
        .required('This field is required'),
    email: yup.string()
        .email('Enter valid email address')
        .required('This field is required'),
    telephoneNumber: yup.string()
        .required('This field is required'),
    password: yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('This field is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')    
});

export default SignUpSchema ;