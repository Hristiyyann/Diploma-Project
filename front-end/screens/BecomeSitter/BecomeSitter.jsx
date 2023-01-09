import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text } from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, Animation } from '../../components/index';
import BecomeSitterForm from './BecomeSitterForm.component';
import AnimationsPaths from '../../assets/animations/AnimationsPaths';
import GlobalStyles from '../../utils/GlobalStyles';

export default function BecomeSitter({route})
{
    const { hasError, message } = route.params;
    
    return(
        <TouchableWithoutFeedback onPress = {() => {Keyboard.dismiss();}}>
            <KeyboardAwareScrollView 
                extraScrollHeight = {20}
                contentContainerStyle = {{flexGrow: 1}}
            >
                <View style = {GlobalStyles.screenContainer}>
                    <Animation
                        path = {hasError ? AnimationsPaths.clock : AnimationsPaths.dog}
                        style = {{width: 300}}
                    />

                    {
                        hasError ?
                        <Text
                            status = 'primary'
                            category = 'h5'
                            style = {GlobalStyles.centeredText}
                        >
                           {message}
                        </Text>
                        :
                        <>
                        <Header
                            method = {'Become a sitter!'}
                        />

                        <BecomeSitterForm/>
                        </>
                    }
                </View>
           </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>  
    )
}