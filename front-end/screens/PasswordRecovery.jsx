import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Text, Input } from '@ui-kitten/components';
import { Header, Icon, Animation, PasswordRecoveryForm } from '../components/index';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import GlobalStyles from '../GlobalStyles';

export default function ViaEmail({route, navigation})
{
    const [value, setValue] = useState('');
    const { forEmail } = route.params;

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

                    <Header
                        method = {'Password recovery'}
                        methodText = {`Enter your registered ${forEmail == true ? `email` : `telephone number`} below to receive recovery code`}
                    />

                    <PasswordRecoveryForm
                        forEmail = {forEmail}
                        navigation = {navigation}
                    />
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