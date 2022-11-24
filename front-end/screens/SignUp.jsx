import React from 'react';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Text } from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Header, Animation, SignUpForm } from '../components/index';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import GlobalStyles from '../GlobalStyles';

export default function SignUp({navigation})
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
                        endText = {'Sign in'}
                        navigateTo = {() => navigation.navigate('Sign In')}
                    />

                    <SignUpForm
                        navigation = {navigation}
                    />

                    <Text>Terms and conditions</Text>
                </View>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>   
    )
}