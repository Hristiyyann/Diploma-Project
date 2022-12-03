import * as yup from 'yup';
import { passwordValidation, telephoneValidation, emailValidation } from './GlobalValidations';

const SignInSchema = emailValidation.shape
({
    password: yup.string()
        .required('This field is required') 
});

const SignUpSchema = emailValidation.concat(passwordValidation).concat(telephoneValidation).shape
({
    fullName: yup.string()
        .required('This field is required'),
})

const baseChangePasswordSchema = yup.object().concat(passwordValidation);

const fullChangePasswordSchema = baseChangePasswordSchema.shape
({
    currentPassword: yup.string()
        .required('This field is required')
})

const BeSitterSchema = yup.object
({
    city: yup.string()
        .required('This field is required'),
    about: yup.string()
        .required('This field is required')
        .min(200, 'This field requires a minimum of 200 characters')
})

export 
{
    SignInSchema, SignUpSchema, baseChangePasswordSchema, fullChangePasswordSchema,
    BeSitterSchema
};
