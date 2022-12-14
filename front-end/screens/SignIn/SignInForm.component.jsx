import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Input } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { Formik, Field } from 'formik';
import { useLoading, usePermissions, useShowError } from '../../contexts/index';
import { SignInSchema } from '../../validations/Schemes';
import { signIn } from '../../requests/Auth';
import apiWrapper from '../../requests/ApiWrapper';
import { Icon, ValidationError, PasswordInput, FormError} from '../../components/index';
import { checkForErrors } from '../../utils/Helpers';
import GlobalStyles from '../../utils/GlobalStyles';

export default function SignInForm()
{
    const [formError, setFormError] = useState(null);
    const { setIsLoading } = useLoading();
    const { setIsLoggedIn, setRoles } = usePermissions();
    const { setServerError } = useShowError();
    const navigation = useNavigation();

    return(
        <>
        <Formik
            initialValues = {
            {
                emailAddress: '',
                password: ''
            }}
            validationSchema = {SignInSchema}
            onSubmit = {async (values) => 
            {
                const response = await apiWrapper(setIsLoading, () => signIn(values, setRoles, setIsLoggedIn));   
                if(!checkForErrors(response, setServerError, setFormError) && response.status === 403)
                {
                    const channel = {...channel, emailAddress: values.emailAddress}
                    navigation.navigate('Verification',
                    {
                        channel,
                        isForPasswordRecovery: false
                    });
                }
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
                    component = {PasswordInput}
                />

                { props.touched.password && props.errors.password && <ValidationError message = {props.errors.password}/> }

                <TouchableOpacity
                    style = {styles.forgetPassword}
                    onPress = {() => navigation.navigate('Forget password')}
                >
                    <Text status = 'primary'>Forget password?</Text>
                </TouchableOpacity>

                {formError && <FormError message = {formError}/>}

                <TouchableOpacity 
                    onPress = {props.handleSubmit}
                    style = {GlobalStyles.button}
                >
                    <Text status = 'primary'>Sign in</Text>
                </TouchableOpacity>
                </>
            )}
        </Formik>
        </>
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