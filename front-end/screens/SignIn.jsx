import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Input, Text} from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../components/Header.Component';
import Icon from '../components/Icon.Component';
import PasswordInputField from '../components/PasswordInputField.Component';
import Animation from '../components/Lottie.Component';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import GlobalStyles from '../GlobalStyles';

export default function SignIn()
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                    />

                    <View style = {GlobalStyles.inputContainer}>
                        <Input
                            style = {GlobalStyles.input}
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
        
                    <TouchableOpacity
                        style = {styles.forgoPassword}
                    >
                        <Text status = 'primary'>Forgot password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {GlobalStyles.button}>
                        <Text status = 'primary'>Sign in</Text>
                    </TouchableOpacity>
                    
                </View>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>   
    )
}

const styles = StyleSheet.create(
{
    forgoPassword:
    {
        alignSelf: 'flex-end',
        paddingRight: 5,
        marginTop: 10
    },
})