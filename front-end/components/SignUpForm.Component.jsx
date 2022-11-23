import React, { useRef } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Input } from '@ui-kitten/components';
import { Formik, Field } from 'formik';
import PhoneInput from 'react-native-phone-number-input';
import { Icon, PasswordInputField } from './index';
import GlobalStyles from '../GlobalStyles';

export default function SignUpForm()
{
    const phoneInput = useRef();

    return(
        <Formik
            initialValues = {
            {
                fullName: '',
                email: '',
                telephoneNumber: '',
                password: '',
                confirmPassword: '',

            }}
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
                        placeholder = 'Full name'
                        accessoryLeft = {<Icon iconName = {'person'}/>}
                        onChangeText = {props.handleChange('fullName')}
                    /> 
                </View>

                <PhoneInput
                    ref={phoneInput}
                    defaultCode='BG'
                    placeholder = {'Telephone number'}
                    layout='first'
                    onChangeText={props.handleChange('telephoneNumber')}
                    containerStyle = {styles.telephoneContainer}
                    textContainerStyle = {styles.telephoneText}
                    textInputStyle = {styles.inputColor}
                    codeTextStyle = {styles.codeStyle}
                />

                <View style = {GlobalStyles.inputContainer}>
                    <Input
                        style = {GlobalStyles.input}
                        textStyle={GlobalStyles.textInputStyle}
                        placeholder = 'Email'
                        accessoryLeft = {<Icon iconName = {'mail'}/>}
                        onChangeText = {props.handleChange('email')}
                    />
                </View>
                
                <Field
                    name = 'password'
                    placeholder = 'Password'
                    component = {PasswordInputField}
                />

                <Field
                    name = 'confirmPassword'
                    placeholder = 'Confirm password'
                    component = {PasswordInputField}
                />
                

                <TouchableOpacity 
                    onPress = {props.handleSubmit}
                    style = {GlobalStyles.button}>
                    <Text status = 'primary'>Continue</Text>
                </TouchableOpacity>
                </>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create(
{
    telephoneContainer:
    {
        width: '100%',
        marginTop: 10,
        borderRadius: 15,
        backgroundColor: '#D9D9D9',
    },
    
    telephoneText:
    {
        borderRadius: 15,
        backgroundColor: '#D9D9D9',
    },

    inputColor:
    {
        color: '#ec6165',
    },

    codeStyle:
    {
        color: '#73423f'
    }
});