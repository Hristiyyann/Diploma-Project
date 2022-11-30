import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Formik, Field } from 'formik';
import { baseChangePasswordSchema, fullChangePasswordSchema } from '../../validations/Schemes';
import { changePassword } from '../../requests/Auth';
import { apiWrapper } from '../../requests/AxiosConfiguration';
import { useLoading } from '../../contexts/index';
import PasswordInputField from '../PasswordInputField.Component';
import ValidationError from '../ValidationError.Component';

export default function ChangePassworForm({isForgotten, navigation})
{
    const { setIsLoading } = useLoading();

    return(
        <Formik
            initialValues = {
            {
                currentPassword: '', 
                password: '', 
                confirmPassword: ''
            }}
            validationSchema = {!isForgotten ? fullChangePasswordSchema : baseChangePasswordSchema}
            onSubmit = {async (values) =>
            {
                let body = {};
                if(!isForgotten) {body = {...body, currentPassword: values.currentPassword}}
                body = {...body, newPassword: values.newPassword, confrimNewPassword: values.confirmNewPassword};
                console.log(body);

                const returnedObject = await apiWrapper(setIsLoading, () => changePassword(body));
                if(returnedObject?.success == true)
                {
                    navigation.reset(
                    {
                        index: 0,
                        routes: [{ name: 'Successfull' }],
                    });
                }
            }}
        >
            {(props) =>
            (
                <>
                {
                    !isForgotten &&
                    <>
                    <Field 
                        name = 'currentPassword'
                        placeholder = {'Current password'} 
                        component = {PasswordInputField}
                    />
                    
                    { props.touched.currentPassword && props.errors.currentPassword && <ValidationError message = {props.errors.currentPassword}/> }
                    </>
                }

                <Field 
                    name = 'password'
                    placeholder = {'New password'} 
                    component = {PasswordInputField}
                />

                { props.touched.password && props.errors.password && <ValidationError message = {props.errors.password}/> }

                <Field 
                    name = 'confirmPassword'
                    placeholder = {'Confirm new password'} 
                    component = {PasswordInputField}
                />

                { props.touched.confirmPassword && props.errors.confirmPassword && <ValidationError message = {props.errors.confirmPassword}/> }

                <TouchableOpacity 
                    onPress = {props.handleSubmit}
                    style = {GlobalStyles.button}
                >
                    <Text status = 'primary'>Apply changes</Text>
                </TouchableOpacity>
                </>
            )}
        </Formik>
    )
}