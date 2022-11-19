import React, {useState} from 'react';
import { TouchableWithoutFeedback, View, Keyboard, TouchableOpacity } from 'react-native';
import {Text} from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../components/Header.Component';
import Animation from '../components/Lottie.Component';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import GlobalStyles from '../GlobalStyles';
import PasswordInputField from '../components/PasswordInputField.Component';

export default function ResetPassword({isForgotten})
{
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

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
                        method = {'Reset password'}
                        methodText = {'Set your new password so you can login'}
                    />

                    {
                        isForgotten && 
                        <PasswordInputField 
                            placeholder = {'Current password'} 
                            iconName = {'lock-closed'}
                            onChange = {setCurrentPassword}
                        />
                    }

                    <PasswordInputField 
                        placeholder = {'New password'} 
                        iconName = {'lock-closed'}
                        onChange = {setNewPassword}
                    />

                    <PasswordInputField 
                        placeholder = {'Confirm new password'} 
                        iconName = {'lock-closed'}
                        onChange = {setConfirmNewPassword}
                    />

                    <TouchableOpacity 
                        style = {GlobalStyles.button}>
                        <Text status = 'primary'>Apply changes</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>   
    )
}