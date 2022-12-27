import React from 'react';
import { TouchableWithoutFeedback, View, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, Animation, ChangePasswordForm } from '../components/index';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import GlobalStyles from '../GlobalStyles';

export default function ChangePassword({route})
{
    const { isForgotten, channel } = route.params;

    return(
        <TouchableWithoutFeedback onPress = {() => {Keyboard.dismiss();}}>
            <KeyboardAwareScrollView 
                extraScrollHeight = {5}
                contentContainerStyle = {{flexGrow: 1}}
            >
                <View style = {GlobalStyles.screenContainer}>
                    
                    <Animation
                        path = {AnimationsPaths.newPassword}
                    />

                    <Header
                        method = {'Change password'}
                        methodText = {`Set your new password ${!isForgotten ? '' : 'so you can login'}`}
                    />

                    <ChangePasswordForm
                        isForgotten = {isForgotten}
                        channel = {channel}
                    />
                </View>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>   
    )
}