import React, { useRef } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Input } from '@ui-kitten/components';
import { Formik, Field } from 'formik';
import PhoneInput from 'react-native-phone-number-input';
import { useLoading } from '../../contexts/index';
import { SignUpSchema } from '../../validations/index';
import { signUp } from '../../requests/Auth';
import { apiWrapper } from '../../requests/AxiosConfiguration'
import Icon from '../Icon.Component';
import ValidationError from '../ValidationError.Component';
import PasswordInputField from '../PasswordInputField.Component';
import LoadingModal from '../LoadingModal.Component';
import GlobalStyles from '../../GlobalStyles';

export default function SignUpForm({navigation})
{
    const phoneInput = useRef();
    const { setIsLoading } = useLoading();

    return(
        <>
        <Formik
            initialValues = {
            {
                fullName: '',
                emailAddress: '',
                telephoneNumber: '',
                password: '',
                confirmPassword: '',

            }}
            validationSchema = {SignUpSchema}
            onSubmit = {async (values) => 
            {
                const returnedObject = await apiWrapper(setIsLoading, () => signUp(values));   
                if(returnedObject?.success == true || returnedObject?.goToVerification == true) 
                { 
                    navigation.replace('Verification'); 
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
                        placeholder = 'Full name'
                        accessoryLeft = {<Icon iconName = {'person'}/>}
                        onChangeText = {props.handleChange('fullName')}
                    /> 
                </View>

                { props.touched.fullName && props.errors.fullName && <ValidationError message = {props.errors.fullName}/> }

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

                { props.touched.telephoneNumber && props.errors.telephoneNumber && <ValidationError message = {props.errors.telephoneNumber}/> } 

                <View style = {GlobalStyles.inputContainer}>
                    <Input
                        style = {GlobalStyles.input}
                        textStyle={GlobalStyles.textInputStyle}
                        placeholder = 'Email'
                        accessoryLeft = {<Icon iconName = {'mail'}/>}
                        onChangeText = {props.handleChange('emailAddress')}
                    />
                </View>

                { props.touched.emailAddress && props.errors.emailAddress && <ValidationError message = {props.errors.emailAddress}/> }
                
                <Field
                    name = 'password'
                    placeholder = 'Password'
                    component = {PasswordInputField}
                />

                { props.touched.password && props.errors.password && <ValidationError message = {props.errors.password}/> }

                <Field
                    name = 'confirmPassword'
                    placeholder = 'Confirm password'
                    component = {PasswordInputField}
                />
                
                { props.touched.confirmPassword && props.errors.confirmPassword && <ValidationError message = {props.errors.confirmPassword}/> }

                <TouchableOpacity 
                    onPress = {props.handleSubmit}
                    style = {GlobalStyles.button}>
                    <Text status = 'primary'>Continue</Text>
                </TouchableOpacity>
                </>
            )}
        </Formik>
        <LoadingModal/>
        </>
    )
}

const styles = StyleSheet.create(
{
    telephoneContainer:
    {
        width: '100%',
        marginTop: 5,
        marginBottom: 5,
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