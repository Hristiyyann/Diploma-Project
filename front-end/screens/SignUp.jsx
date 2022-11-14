import React, {useEffect, useState} from 'react';
import PhoneInput from "react-native-phone-number-input";
import Lottie from 'lottie-react-native';
import {StyleSheet, View, KeyboardAvoidingView, Keyboard, Platform, TouchableWithoutFeedback} from 'react-native';
import {Text, Button} from '@ui-kitten/components';
import InputField from '../components/InputField.Component';
import PasswordInputField from '../components/PasswordInputField.Component';

export default function SignIn()
{
    const animation = React.useRef();
    const [value, setValue] = useState("");
    const phoneInput = React.useRef(null);

    useEffect(() => {
        setTimeout(() => animation.current?.play());

        return () => {
            animation.current?.reset();
        }
    }, []);

    return(
        <TouchableWithoutFeedback onPress = {() => {Keyboard.dismiss();}}>
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
                
                <View style = {styles.signUp}>
                    <Text
                        status = 'primary'
                        style = {styles.signUpText}>Sign Up</Text>
                    <Text>Already have an account?
                        <Text status = 'primary'> Sign in</Text>
                    </Text>
                </View>


                <InputField 
                    placeholder = {'Full name'} 
                    iconName = {'person'}/>

                
                <PhoneInput
                    ref={phoneInput}
                    defaultCode="BG"
                    placeholder = {'Telephone number'}
                    layout="first"
                    onChangeText={(text) => 
                    {
                        setValue(text);
                    }}
                    withShadow
                    containerStyle = {styles.telephoneContainer}
                    textContainerStyle = {styles.telephoneText}
                />
                
                <InputField 
                    placeholder = {'Email'} 
                    iconName = {'mail'}/>
                <PasswordInputField 
                    placeholder = {'Password'} 
                    iconName = {'lock-closed'}/>
                <PasswordInputField 
                    placeholder = {'Confirm password'} 
                    iconName = {'lock-closed'}/>
                
                <Button style = {styles.button}>Continue</Button>

                <Text>Terms and conditions</Text>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>   
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

    signUp:
    {
        alignSelf: 'flex-start',
        paddingLeft: 5,
    },

    signUpText:
    {
        fontSize: 25,
        fontWeight: 'bold',
    },

    button:
    {
        marginTop: 25,
        marginBottom: 10,
        width: '80%'
    },

    telephoneContainer:
    {
        width: '100%',
        marginTop: 10,
        borderRadius: 15,
        backgroundColor: '#D9D9D9'
    },

    telephoneText:
    {
        borderRadius: 15,
        backgroundColor: '#D9D9D9'
    }
});