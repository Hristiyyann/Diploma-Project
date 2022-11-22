import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, Keyboard } from 'react-native';
import { Input, Text } from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, Icon, Animation } from '../components/index';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import GlobalStyles from '../GlobalStyles';

export default function Verification()
{
    const [code, setCode] = useState('');

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
                        methodText = {'Enter the 6 digit code number that we send to +3590000000'}
                    />

                    <View style = {GlobalStyles.inputContainer}>
                        <Input
                            style = {GlobalStyles.input}
                            value = {code}
                            placeholder = 'Code'
                            accessoryLeft = {<Icon iconName = {'checkmark-circle'}/>}
                            onChangeText = {(currentValue) => setCode(currentValue)}
                        /> 
                    </View>

                    <TouchableOpacity 
                        style = {GlobalStyles.button}>
                        <Text status = 'primary'>Continue</Text>
                    </TouchableOpacity>

                    <Text status = 'primary'>Don't receive code? Resend Again</Text>
                </View>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>  
    )
}