import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik, Field } from 'formik';
import { baseChangePasswordSchema, fullChangePasswordSchema } from '../../validations/Schemes';
import { changePassword, forgetPassword } from '../../requests/Auth';
import apiWrapper from '../../requests/ApiWrapper';
import { useLoading, usePermissions, useShowError } from '../../contexts/index';
import PasswordInputField from '../PasswordInputField.Component';
import ValidationError from '../ValidationError.Component';
import FormError from '../FormError.Component';
import { checkForErrors } from '../../Utils';
import AnimationsPaths from '../../assets/animations/AnimationsPaths';

export default function ChangePassworForm({isForgotten, channel})
{
    const [formError, setFormError] = useState(null);
    const { setIsLoading } = useLoading();
    const { setServerError } = useShowError();
    const navigation = useNavigation();
    let initialValues = {password: '', confirmPassword: ''};
    if(!isForgotten) { initialValues = {...initialValues, currentPassword: ''}};

    return(
        <Formik
            initialValues = {initialValues}
            validationSchema = {!isForgotten ? fullChangePasswordSchema : baseChangePasswordSchema}
            onSubmit = {async (values) =>
            {
                let response;

                if(channel != null) 
                {
                    response = await apiWrapper(setIsLoading, () => forgetPassword({...channel, ...values}));
                }
                else
                {
                    response = await apiWrapper(setIsLoading, () => changePassword(values));
                }
                
                if(checkForErrors(response, setServerError, setFormError))
                { 
                    navigation.reset(
                    {
                        index: 0,
                        routes: [{ name: 'Successful', params: 
                        {
                            path: AnimationsPaths.success,
                            firstText: ' Your password was successfully changed.',
                            secondText: 'Use your new password to login',
                            needLogIn: true,
                            buttonText: 'Log in'
                        } }],
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

                {formError && <FormError message = {formError}/>}

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