import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {Input, Text} from '@ui-kitten/components';
import Icon from '../components/Icon.Component';
import PasswordInputField from '../components/PasswordInputField.Component';
import Lottie from 'lottie-react-native';

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
        <SafeAreaView style = {styles.container}>
            
            <Lottie
                style={
                {
                    width: 230,
                    height: 230,
                }}
                source={require('../assets/signin.json')}
                ref={animation} 
            /> 

            <View style = {styles.signUp}>
                <Text
                    status = 'primary'
                    style = {styles.signUpText}>Sign In
                </Text>

                <Text>Already have an account?
                    <Text status = 'primary'> Sign in</Text>
                </Text>
            </View>

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
        </SafeAreaView>
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
})