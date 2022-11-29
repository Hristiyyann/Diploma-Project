import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Formik, Field } from 'formik';
import { ChangePasswordSchema } from '../../validations/index';
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
                newPassword: '', 
                confirmNewPassword: ''
            }}
            validationSchema = {ChangePasswordSchema}
            onSubmit = {async (values) =>
            {
                let body = {};
                if(!isForgotten) {body = {...body, currentPassword: values.currentPassword}}
                body = {...body, newPassword: values.newPassword, confrimNewPassword: values.confirmNewPassword};

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
                    name = 'newPassword'
                    placeholder = {'New password'} 
                    component = {PasswordInputField}
                />

                { props.touched.newPassword && props.errors.newPassword && <ValidationError message = {props.errors.newPassword}/> }

                <Field 
                    name = 'confirmNewPassword'
                    placeholder = {'Confirm new password'} 
                    component = {PasswordInputField}
                />

                { props.touched.confirmNewPassword && props.errors.confirmNewPassword && <ValidationError message = {props.errors.confirmNewPassword}/> }

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