import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {Input, Text} from '@ui-kitten/components';
import Icon from '../components/Icon.Component';
import PasswordInputField from '../components/PasswordInputField.Component';
import Lottie from 'lottie-react-native';
import GlobalStyles from '../GlobalStyles';

export default function SignIn()
{
    const animation = React.useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setTimeout(() => animation.current?.play());

        return () => {
            animation.current?.reset();
        }
    }, []);


    return(
        <SafeAreaView style = {GlobalStyles.screenContainer}>
            
            <Lottie
                style={
                {
                    width: 230,
                    height: 230,
                }}
                source={require('../assets/signin.json')}
                ref={animation} 
            /> 

            <View style = {GlobalStyles.method}>
                <Text
                    status = 'primary'
                    style = {GlobalStyles.methodText}>Sign In
                </Text>

                <Text>Already have an account?
                    <Text status = 'primary'> Sign in</Text>
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
        </SafeAreaView>
    )
}