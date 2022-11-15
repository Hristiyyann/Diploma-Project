import React, {useEffect, useState} from 'react';
import {StyleSheet, View, KeyboardAvoidingView, Keyboard, Platform, 
        TouchableWithoutFeedback, SafeAreaView, TouchableOpacity} from 'react-native';
import {Text, Input} from '@ui-kitten/components';
import PhoneInput from "react-native-phone-number-input";
import Lottie from 'lottie-react-native';
import PasswordInputField from '../components/PasswordInputField.Component';
import Icon from '../components/Icon.Component';


export default function SignIn()
{
    const animation = React.useRef();
    const phoneInput = React.useRef(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        setTimeout(() => animation.current?.play());

        return () => {
            animation.current?.reset();
        }
    }, []);

    return(
        <TouchableWithoutFeedback onPress = {() => {Keyboard.dismiss();}}>
            <SafeAreaView style={ { flex: 1 } }>
                <KeyboardAvoidingView
                style = {styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <Lottie
                        style={
                        {
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
                            style = {styles.signUpText}>Sign Up
                        </Text>

                        <Text>Already have an account?
                            <Text status = 'primary'> Sign in</Text>
                        </Text>
                    </View>

                    <View style = {styles.inputContainer}>
                        <Input
                            style = {styles.input}
                            value = {fullName}
                            placeholder = 'Full name'
                            accessoryLeft = {<Icon iconName = {'person'}/>}
                            onChangeText = {(currentValue) => setFullName(currentValue)}
                        /> 
                    </View>

                    <PhoneInput
                        ref={phoneInput}
                        defaultCode="BG"
                        placeholder = {'Telephone number'}
                        layout="first"
                    /*  onChangeText={(text) => 
                        {
                            setValue(text);
                        }} */
                        withShadow
                        containerStyle = {styles.telephoneContainer}
                        textContainerStyle = {styles.telephoneText}
                    />

                    <View style = {styles.inputContainer}>
                        <Input
                            style = {styles.input}
                            value = {email}
                            placeholder = 'Email'
                            accessoryLeft = {<Icon iconName = {'mail'}/>}
                            onChangeText = {(currentValue) => setEmail(currentValue)}
                        />
                    </View>

                    <PasswordInputField 
                        placeholder = {'Password'} 
                        iconName = {'lock-closed'}
                        onChange = {setPassword}
                    />

                    <PasswordInputField 
                        placeholder = {'Confirm password'} 
                        iconName = {'lock-closed'}
                        onChange = {setConfirmPassword}
                    />
                    
                    <TouchableOpacity style = {styles.button}>
                        <Text>Continue</Text>
                    </TouchableOpacity>

                    <Text>Terms and conditions</Text>
                </KeyboardAvoidingView>
            </SafeAreaView>
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

    inputContainer: 
    {
        alignSelf: 'stretch',
        marginTop:10,
    },
  
    input:
    {
        borderRadius: 15,
        borderWidth: 0,
        backgroundColor: '#D9D9D9',
    },

    signUp:
    {
        alignSelf: 'flex-start',
        paddingLeft: 5,
        marginTop: 10
    },
    
    signUpText:
    {
        fontSize: 40,
        fontWeight: 'bold',
    },

    button:
    {
        alignItems: 'center',
        width: '80%',
        padding: 10,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 15,
        backgroundColor: '#D9D9D9',
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
        backgroundColor: '#D9D9D9',
    }
});