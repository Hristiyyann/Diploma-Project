import * as yup from 'yup';

const SignInSchema = yup.object
({
    email: yup.string()
        .email('Enter valid email address')
        .required('This field is required'),
    password: yup.string()
        .required('This field is required') 
});

export default SignInSchema ;