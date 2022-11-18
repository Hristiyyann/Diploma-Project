import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Text, Input } from '@ui-kitten/components';
import Animation from '../components/Lottie.Component';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import Icon from '../components/Icon.Component';
import GlobalStyles from '../GlobalStyles';

export default function ViaEmail()
{
    const [email, setEmail] = useState('');

    return(
        <TouchableWithoutFeedback onPress = {() => {Keyboard.dismiss();}}>
            <KeyboardAvoidingView
                style = {GlobalStyles.screenContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            
                <Animation
                    path = {AnimationsPaths.viaEmail}
                    style = {{height: 350}}
                    loop = {false}
                />

                <View style = {GlobalStyles.method}>
                    <Text
                        status = 'primary'
                        category = 'h2'
                    >
                        Password recovery
                    </Text>    
                    <Text 
                        style = {styles.methodText}
                        category = 'p1'
                    >
                        Enter your registered email below to receive recover code
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

                <TouchableOpacity style = {GlobalStyles.button}>
                    <Text status = 'primary'>Send</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>  
    )
}

const styles = StyleSheet.create(
{
    text:
    {
        marginBottom: 15,
        textAlign: 'center',
    }
})