import * as yup from 'yup';

const ChangePasswordSchema = yup.object
({
    currentPassword: yup.string()
        .optional(),
    newPassword: yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('This field is required'),
    confirmNewPassword: yup.string()
        .oneOf([yup.ref('newPassword')], 'Passwords must match')
        .required('This field is required'),
});

export default ChangePasswordSchema;