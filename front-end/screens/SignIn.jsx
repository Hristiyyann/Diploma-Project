import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Input, Text } from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, Icon, Animation, PasswordInputField } from '../components/index';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import GlobalStyles from '../GlobalStyles';

export default function SignIn({navigation})
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
                        navigateTo = {() => navigation.navigate('Sign Up')}
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
                        style = {styles.forgetPassword}
                        onPress = {() => navigation.navigate('Forget password')}
                    >
                        <Text status = 'primary'>Forgot password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style = {GlobalStyles.button}>
                        <Text status = 'primary'>Sign in</Text>
                    </TouchableOpacity>
                    
                </View>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>   
    )
}

const styles = StyleSheet.create(
{
    forgetPassword:
    {
        alignSelf: 'flex-end',
        paddingRight: 5,
        marginTop: 10
    },
})