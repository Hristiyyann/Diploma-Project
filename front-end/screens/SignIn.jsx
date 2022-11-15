import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {Input, Text} from '@ui-kitten/components';
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
        <SafeAreaView style = {GlobalStyles.screenContainer}>

            <Animation
                path = {AnimationsPaths.signIn}
            />

            <View style = {GlobalStyles.method}>
                <Text
                    status = 'primary'
                    style = {GlobalStyles.methodText}>Sign In
                </Text>

                <Text>Don't have an account?
                    <Text status = 'primary'> Sign up</Text>
                </Text>
            </View>

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

        </SafeAreaView>
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