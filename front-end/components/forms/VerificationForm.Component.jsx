import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Formik } from 'formik';
import { useLoading, usePermissions } from '../../contexts/index';
import apiWrapper from '../../requests/ApiWrapper';
import { verification, resendVerificationCode, checkCode } from '../../requests/Auth';

export default function VerificationForm({channel, isForPasswordRecovery, navigation})
{
    const { setIsLoading } = useLoading();
    const { setIsLoggedIn, setRoles } = usePermissions();

    async function resendCode()
    {
        await apiWrapper(setIsLoading, () => resendVerificationCode());
    }

    return(
        <Formik
            initialValues = 
            {{
                code: ''
            }}
            onSubmit = {async (values) =>
            {  
                const data = {...channel, code: values.code};
                
                if(isForPasswordRecovery == true)
                {
                    const returnedObject = await apiWrapper(setIsLoading, () => checkCode(data));   
                   
                    if(returnedObject?.success == true)
                    {
                        navigation.navigate('Change password',
                        {
                            isForgotten: true,
                            channel
                        });
                    }
                    return;
                }

                await apiWrapper(setIsLoading, () => verification(values.code, setRoles, setIsLoggedIn));
            }}
        >
            {(props) =>
            (
                <>
                <OTPInputView
                    style = {styles.otpContainer}
                    pinCount={6}
                    onCodeChanged = {props.handleChange('code')}
                    codeInputFieldStyle = {styles.notHighlighted}
                    codeInputHighlightStyle = {styles.highlighted}
                    onCodeFilled = {props.handleSubmit}
                />

                <TouchableOpacity
                    onPress = {resendCode}    
                >
                    <Text status = 'primary'>Don't receive code? Resend Again</Text>
                </TouchableOpacity>
                </>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create
({  

    otpContainer:
    {
        width: '100%', 
        height: 100,
        marginBottom: 20
    },

    notHighlighted: 
    {
      borderWidth: 0,
      borderBottomWidth: 2,
      borderColor: '#73423f',
      color: '#ec6165',
      fontSize: 23,
    },
  
    highlighted: 
    {
      borderColor: "#ec6165",
      borderBottomWidth: 2,
    },
});