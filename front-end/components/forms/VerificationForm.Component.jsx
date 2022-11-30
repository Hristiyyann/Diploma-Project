import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Input, Text } from '@ui-kitten/components';
import { Formik } from 'formik';
import { useLoading, usePermissions } from '../../contexts/index';
import { apiWrapper } from '../../requests/AxiosConfiguration';
import { verification, resendVerificationCode, checkCode } from '../../requests/Auth';
import Icon from '../Icon.Component';
import GlobalStyles from '../../GlobalStyles';

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

                await apiWrapper(setIsLoading, () => verification(code, setRoles, setIsLoggedIn));
            }}
        >
            {(props) =>
            (
                <>
                <View style = {GlobalStyles.inputContainer}>
                    <Input
                        style = {GlobalStyles.input}
                        textStyle={GlobalStyles.textInputStyle}
                        placeholder = 'Code'
                        accessoryLeft = {<Icon iconName = {'checkmark-circle'}/>}
                        onChangeText = {props.handleChange('code')}
                    /> 
                </View>

                <TouchableOpacity 
                    onPress = {props.handleSubmit}
                    style = {GlobalStyles.button}
                >
                    <Text status = 'primary'>Continue</Text>
                </TouchableOpacity>

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