import React from 'react';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Text } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Header, Animation } from '../../components/index';
import SignUpForm from './SignUpForm.component';
import AnimationsPaths from '../../assets/animations/AnimationsPaths';
import GlobalStyles from '../../utils/GlobalStyles';

export default function SignUp()
{
    return( 
        <TouchableWithoutFeedback onPress = {() => {Keyboard.dismiss();}}>
            <KeyboardAwareScrollView 
                extraScrollHeight = {10}
                contentContainerStyle = {{flexGrow: 1}}
            >   
                <View style = {GlobalStyles.screenContainer}>
                    <Animation
                        path={AnimationsPaths.signUp}
                    />

                    <Header
                        method = {'Sign Up'}
                        methodText = {'Already have an account?'}
                        endText = {'Sign In'}
                    />

                    <SignUpForm/>

                    <Text>Terms and conditions</Text>
                    <StatusBar style="dark"/>
                </View>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>   
    )
}