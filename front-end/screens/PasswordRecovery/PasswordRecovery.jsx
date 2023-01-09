import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Header, Animation } from '../../components/index';
import PasswordRecoveryForm  from './PasswordRecoveryForm.component';
import AnimationsPaths from '../../assets/animations/AnimationsPaths';
import GlobalStyles from '../../utils/GlobalStyles';

export default function ViaEmail({route})
{
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