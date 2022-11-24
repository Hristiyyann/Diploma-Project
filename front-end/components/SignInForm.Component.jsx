import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Input } from '@ui-kitten/components';
import { Formik, Field } from 'formik';
import { useLoading, usePermissions } from '../contexts/index';
import { SignInSchema } from '../validations/index';
import { signIn } from '../requests/Auth';
import Icon from './Icon.Component';
import ValidationError from './ValidationError.Component';
import PasswordInputField from './PasswordInputField.Component';
import GlobalStyles from '../GlobalStyles';

export default function SignInForm({navigation})
{
    const { isLoading, setLoading } = useLoading();
    const { setIsLoggedIn, setRoles } = usePermissions();

    return(
        <Formik
            initialValues = {
            {
                emailAddress: '',
                password: ''
            }}
            validationSchema = {SignInSchema}
            onSubmit = {async (values) => 
            {
                setLoading(true);

                const { roles, error } = await signIn(values);

                if(!error)
                {
                    setLoading(false);
                    setRoles(roles);
                    setIsLoggedIn(true);
                }

                setLoading(false);
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
                        onChangeText = {props.handleChange('emailAddress')}
                    />
                </View>

                { props.touched.emailAddress && props.errors.emailAddress && <ValidationError message = {props.errors.emailAddress} /> }
                
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