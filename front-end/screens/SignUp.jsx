import React, {useState, useRef} from 'react';
import {StyleSheet, View, Keyboard, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import {Text, Input} from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PhoneInput from 'react-native-phone-number-input';
import Animation from '../components/Lottie.Component';
import PasswordInputField from '../components/PasswordInputField.Component';
import Icon from '../components/Icon.Component';
import GlobalStyles from '../GlobalStyles';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import send from '../requests/AxiosRequests';

export default function SignIn()
{
    const phoneInput = useRef(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return( 
        <TouchableWithoutFeedback onPress = {() => {Keyboard.dismiss();}}>
            <KeyboardAwareScrollView 
                extraScrollHeight = {10}
                contentContainerStyle = {{flexGrow: 1}}>
                    
                <View style = {GlobalStyles.screenContainer}>
                    <Animation
                        path={AnimationsPaths.signUp}
                    />

                    <View style = {GlobalStyles.method}>
                        <Text
                            status = 'primary'
                            category = 'h2'
                        >
                            Sign Up
                        </Text>

                        <Text status = 'primary'>
                            Already have an account? Sign in
                        </Text>
                    </View>

                    <View style = {GlobalStyles.inputContainer}>
                        <Input
                            style = {GlobalStyles.input}
                            value = {fullName}
                            placeholder = 'Full name'
                            accessoryLeft = {<Icon iconName = {'person'}/>}
                            onChangeText = {(currentValue) => setFullName(currentValue)}
                        /> 
                    </View>

                    <PhoneInput
                        ref={phoneInput}
                        defaultCode='BG'
                        placeholder = {'Telephone number'}
                        layout='first'
                    /*  onChangeText={(text) => 
                        {
                            setValue(text);
                        }} */
                        withShadow
                        containerStyle = {styles.telephoneContainer}
                        textContainerStyle = {styles.telephoneText}
                        textInputStyle = {styles.inputColor}
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

                    <PasswordInputField 
                        placeholder = {'Confirm password'} 
                        iconName = {'lock-closed'}
                        onChange = {setConfirmPassword}
                    />
                    
                    <TouchableOpacity 
                        onPress = {send}
                        style = {GlobalStyles.button}>
                        <Text status = 'primary'>Continue</Text>
                    </TouchableOpacity>

                    <Text status = 'primary'>Terms and conditions</Text>
                </View>
            </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>   
    )
}

const styles = StyleSheet.create(
{
    telephoneContainer:
    {
        width: '100%',
        marginTop: 10,
        borderRadius: 15,
        backgroundColor: '#D9D9D9',
    },
    
    telephoneText:
    {
        borderRadius: 15,
        backgroundColor: '#D9D9D9',
        color: 'red'
    },

    inputColor:
    {
        color: '#ec6165',
    }
});