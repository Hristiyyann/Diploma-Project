import * as yup from 'yup';

const basePasswordSchema = yup.object
({
    newPassword: yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('This field is required'),
    confirmNewPassword: yup.string()
        .oneOf([yup.ref('newPassword')], 'Passwords must match')
        .required('This field is required'),
})

const allPasswordSchema = basePasswordSchema.shape(
{
    currentPassword: yup.string()
        .required('This field is required')
})

export { basePasswordSchema, allPasswordSchema };