import React, { useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Input } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { Formik, Field } from 'formik';
import PhoneInput from 'react-native-phone-number-input';
import { useLoading, useShowError } from '../../contexts/index';
import { SignUpSchema } from '../../validations/Schemes';
import { signUp } from '../../requests/Auth';
import apiWrapper from '../../requests/ApiWrapper';
import Icon from '../Icon.Component';
import ValidationError from '../ValidationError.Component';
import PasswordInputField from '../PasswordInputField.Component';
import LoadingModal from '../LoadingModal.Component';
import FormError from '../FormError.Component';
import { checkForErrors } from '../../Utils';
import GlobalStyles from '../../GlobalStyles';

export default function SignUpForm()
{
    const [formError, setFormError] = useState(null);
    const phoneInput = useRef();
    const { setIsLoading } = useLoading();
    const { setServerError } = useShowError();
    const navigation = useNavigation();

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
                const currentTelephone = '+' + phoneInput.current.getCallingCode() + values.telephoneNumber;
                values = {...values, telephoneNumber: currentTelephone};

                const response = await apiWrapper(setIsLoading, () => signUp(values));   
                if(checkForErrors(response, setServerError, setFormError) || response.status === 403)
                { 
                    const channel = {...channel, telephoneNumber: values.telephoneNumber};
                    navigation.replace('Verification',
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
                    containerStyle = {GlobalStyles.telephoneContainer}
                    textContainerStyle = {GlobalStyles.telephoneText}
                    textInputStyle = {GlobalStyles.inputColor}
                    codeTextStyle = {GlobalStyles.codeStyle}
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

                {formError && <FormError message = {formError}/>}

                <TouchableOpacity 
                    onPress = {props.handleSubmit}
                    style = {GlobalStyles.button}>
                    <Text status = 'primary'>Continue</Text>
                </TouchableOpacity>
                </>
            )}
        </Formik>
        </>
    )
}