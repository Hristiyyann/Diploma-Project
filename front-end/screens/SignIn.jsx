import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, Animation, SignInForm } from '../components/index';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import GlobalStyles from '../GlobalStyles';

export default function SignIn({navigation})
{   
    return(
        <TouchableWithoutFeedback onPress = {() => {Keyboard.dismiss();}}>
            <KeyboardAwareScrollView 
                extraScrollHeight = {5}
                contentContainerStyle = {{flexGrow: 1}}
            >
                <View style = {GlobalStyles.screenContainer}>
                    <Animation
                        path = {AnimationsPaths.signIn}
                    />

                    <Header
                        method = {'Sign In'}
                        methodText = {'Don\'t have an account?'}
                        endText = {'Sign up'}
                        navigateTo = {() => navigation.navigate('Sign Up')}
                    />

                    <SignInForm
                        navigation = {navigation}
                    />
                </View>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
    )
}