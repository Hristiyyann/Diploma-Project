import React, { useEffect }from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, Animation } from '../../components/index';
import SignInForm from './SignInForm.component';
import AnimationsPaths from '../../assets/animations/AnimationsPaths';
import GlobalStyles from '../../utils/GlobalStyles';

export default function SignIn()
{   
    useEffect(() => 
    {
        async function hideSplashScreen()
        {
            await SplashScreen.hideAsync();
        }
        
        hideSplashScreen();
    }, []);

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
                        endText = {'Sign Up'}
                    />

                    <SignInForm/>
                    <StatusBar style="dark"/>
                </View>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
    )
}