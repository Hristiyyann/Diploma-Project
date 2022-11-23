import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Input } from '@ui-kitten/components';
import { Formik, Field } from 'formik';
import { SignInSchema } from '../validations/index';
import Icon from './Icon.Component';
import ValidationError from './ValidationError.Component';
import PasswordInputField from './PasswordInputField.Component';
import GlobalStyles from '../GlobalStyles';

export default function SignInForm({navigation})
{
    return(
        <Formik
            initialValues = {
            {
                email: '',
                password: ''
            }}
            validationSchema = {SignInSchema}
            onSubmit = {(values) => 
            {
                console.log(values);
            }}
        >
            {(props) => 
            (
                <>
                <View style = {GlobalStyles.inputContainer}>
                    <Input
                        style = {GlobalStyles.input}
                        textStyle={GlobalStyles.textInputStyle}
                        placeholder = 'Email'
                        accessoryLeft = {<Icon iconName = {'mail'}/>}
                        onChangeText = {props.handleChange('email')}
                    />
                </View>

                { props.touched.email && props.errors.email && <ValidationError message = {props.errors.email}/> }
                
                <Field
                    name = 'password'
                    placeholder = 'Password'
                    component = {PasswordInputField}
                />

                { props.touched.password && props.errors.password && <ValidationError message = {props.errors.password}/> }

                <TouchableOpacity
                    style = {styles.forgetPassword}
                    onPress = {() => navigation.navigate('Forget password')}
                >
                    <Text status = 'primary'>Forget password?</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress = {props.handleSubmit}
                    style = {GlobalStyles.button}
                >
                    <Text status = 'primary'>Sign in</Text>
                </TouchableOpacity>
                </>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create(
{
    forgetPassword:
    {
        alignSelf: 'flex-end',
        paddingRight: 5,
        marginTop: 10
    },
});