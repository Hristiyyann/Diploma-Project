import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, Animation, VerificationForm } from '../components/index';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import GlobalStyles from '../GlobalStyles';

export default function Verification({route, navigation})
{
    const { channel, isForPasswordRecovery } = route.params;

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
                        methodText = {`Enter the 6 digit code number that we send to ${channel?.telephoneNumber || channel?.emailAddress}`}
                    />

                    <VerificationForm
                        channel = {channel}
                        isForPasswordRecovery = {isForPasswordRecovery}
                        navigation = {navigation}
                    />
                </View>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>  
    )
}