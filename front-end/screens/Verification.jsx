import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, Keyboard } from 'react-native';
import { Input, Text } from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, Icon, Animation } from '../components/index';
import { useLoading, usePermissions } from '../contexts/index';
import { apiWrapper } from '../requests/AxiosConfiguration';
import { verification, resendVerificationCode } from '../requests/Auth';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import GlobalStyles from '../GlobalStyles';

export default function Verification({route})
{
    const [code, setCode] = useState('');
    const { setIsLoading } = useLoading();
    const { setIsLoggedIn, setRoles } = usePermissions();
    const { value, forPasswordRecovery } = route.params;

    async function sendCode()
    {
        await apiWrapper(setIsLoading, () => verification(code, setRoles, setIsLoggedIn));   
    }

    async function resendCode()
    {
        await apiWrapper(setIsLoading, () => resendVerificationCode());
    }

    return(
        <TouchableWithoutFeedback onPress = {() => {Keyboard.dismiss();}}>
            <KeyboardAwareScrollView 
                extraScrollHeight = {5}
                contentContainerStyle = {{flexGrow: 1}}
            >
                <View style = {GlobalStyles.screenContainer}>
                    
                    <Animation
                        path = {AnimationsPaths.otp}
                        style = {{width: 320}}
                        loop = {false}
                    />
                    <Header
                        method = {'Verification code'}
                        methodText = {`Enter the 6 digit code number that we send to ${value}`}
                    />

                    <View style = {GlobalStyles.inputContainer}>
                        <Input
                            style = {GlobalStyles.input}
                            textStyle={GlobalStyles.textInputStyle}
                            value = {code}
                            placeholder = 'Code'
                            accessoryLeft = {<Icon iconName = {'checkmark-circle'}/>}
                            onChangeText = {(currentValue) => setCode(currentValue)}
                        /> 
                    </View>

                    <TouchableOpacity 
                        onPress = {sendCode}
                        style = {GlobalStyles.button}
                    >
                        <Text status = 'primary'>Continue</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress = {resendCode}    
                    >
                        <Text status = 'primary'>Don't receive code? Resend Again</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>  
    )
}