import React, { useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Input } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import PhoneInput from 'react-native-phone-number-input';
import { Formik } from 'formik';
import { emailValidation, telephoneValidation } from '../../validations/GlobalValidations';
import { useLoading, useShowError } from '../../contexts/index';
import { passwordRecovery } from '../../requests/Auth';
import apiWrapper from '../../requests/ApiWrapper';
import Icon from '../Icon.Component';
import ValidationError from '../ValidationError.Component';
import FormError from '../FormError.Component';
import { checkForErrors } from '../../Utils';
import GlobalStyles from '../../GlobalStyles';

export default function PasswordRecoveryForm({forEmail})
{
    const [formError, setFormError] = useState(null);
    const phoneInput = useRef();
    const { setIsLoading } = useLoading();
    const { setServerError } = useShowError();
    const navigation = useNavigation();
    let initialValues = {};
    {forEmail == true ? initialValues = {...initialValues, emailAddress: ''} : initialValues = {...initialValues, telephoneNumber: ''}}
    
    return(
        <Formik
            initialValues = {initialValues}
            validationSchema = {forEmail == true ? emailValidation : telephoneValidation}
            onSubmit = {async (values) =>
            {
                if(values?.telephoneNumber)
                {
                    const currentTelephone = '+' + phoneInput.current.getCallingCode() + values.telephoneNumber;
                    values = {...values, telephoneNumber: currentTelephone};
                }

                const response = await apiWrapper(setIsLoading, () => passwordRecovery(values));
                  
                if(checkForErrors(response, setServerError, setFormError))
                {
                    navigation.navigate('Verification',
                    {
                        channel: values,
                        isForPasswordRecovery: true
                    });
                }
            }}
        >
            {(props) =>
            (
                <>
                {
                    forEmail == true ?
                    <>
                    <View style = {GlobalStyles.inputContainer}>
                        <Input
                            style = {GlobalStyles.input}
                            textStyle={GlobalStyles.textInputStyle}
                            placeholder = {'Email'}
                            accessoryLeft = {<Icon iconName = {'mail'}/>}
                            onChangeText = {props.handleChange('emailAddress')}
                        />
                    </View>

                    { props.touched.emailAddress && props.errors.emailAddress && <ValidationError message = {props.errors.emailAddress}/> }

                    </> :
                    <>
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

                    </>
                }

                {formError && <FormError message = {formError}/>}

                <TouchableOpacity 
                    onPress = {props.handleSubmit}
                    style = {GlobalStyles.button}
                >
                    <Text status = 'primary'>Send code</Text>
                </TouchableOpacity>
                </>
            )}
        </Formik>
    )
}