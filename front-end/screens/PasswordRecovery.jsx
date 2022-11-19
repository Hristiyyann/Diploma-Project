import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Text, Input } from '@ui-kitten/components';
import Animation from '../components/Lottie.Component';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import Icon from '../components/Icon.Component';
import GlobalStyles from '../GlobalStyles';

export default function ViaEmail({forEmail})
{
    const [value, setValue] = useState('');

    return(
        <TouchableWithoutFeedback onPress = {() => {Keyboard.dismiss();}}>
           <KeyboardAwareScrollView 
                extraScrollHeight = {5}
                contentContainerStyle = {{flexGrow: 1}}
            >
                <View style = {GlobalStyles.screenContainer}>
            
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
                            Enter your registered {forEmail ? 'email' : 'telephone number'} below to receive recovery code
                        </Text>
                    </View>


                    <View style = {GlobalStyles.inputContainer}>
                        <Input
                            style = {GlobalStyles.input}
                            value = {value}
                            placeholder = {forEmail ? 'Email' : 'Telephone number'}
                            accessoryLeft = {<Icon iconName = {forEmail ? 'mail' : 'call'}/>}
                            onChangeText = {(currentValue) => setValue(currentValue)}
                        />
                    </View>

                    <TouchableOpacity style = {GlobalStyles.button}>
                        <Text status = 'primary'>Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
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