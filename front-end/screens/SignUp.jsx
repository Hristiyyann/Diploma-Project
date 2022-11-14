import React, {useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet, View, KeyboardAvoidingView, Platform} from 'react-native';
import {Button} from '@ui-kitten/components';
import InputField from '../components/InputField.Component';
import PasswordInputField from '../components/PasswordInputField.Component';
import Lottie from 'lottie-react-native';

export default function SignIn()
{
    const animation = React.useRef();

    useEffect(() => {
        setTimeout(() => animation.current?.play());

        return () => {
            animation.current?.reset();
        }
    }, []);

    return(
        <KeyboardAvoidingView
        style = {styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Lottie
                style={{
                width: 230,
                height: 230,
                }}
                source={require('../assets/signup.json')}
                loop = {false}
                ref={animation} 
            />
            
            <Text style = {styles.signUpText}>Sign Up</Text>

            <InputField 
            placeholder = {'Full name'} 
            iconName = {'person'}/>   
            <InputField 
            placeholder = {'Telephone number'} 
            iconName = {'call'}/>
            <InputField 
            placeholder = {'Email'} 
            iconName = {'mail'}/>
            <PasswordInputField 
            placeholder = {'Password'} 
            iconName = {'lock-closed'}/>
            <PasswordInputField 
            placeholder = {'Confirm password'} 
            iconName = {'lock-closed'}/>
            
            <Button>Continue</Button>

            <Text>Already have an account?<Text> Sign in</Text></Text>
            <Text>Terms and conditions</Text>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create(
{
    container: 
    {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15
    },

    signUpText:
    {
        fontSize: 25,
        alignSelf: 'flex-start',
        paddingLeft: 5
    }
});