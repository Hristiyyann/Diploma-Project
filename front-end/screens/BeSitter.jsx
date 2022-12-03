import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, Animation, BeSitterForm } from '../components/index';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import GlobalStyles from '../GlobalStyles';

export default function BeSitter()
{
    return(
        <TouchableWithoutFeedback onPress = {() => {Keyboard.dismiss();}}>
            <KeyboardAwareScrollView 
                extraScrollHeight = {20}
                contentContainerStyle = {{flexGrow: 1}}
            >
                <View style = {GlobalStyles.screenContainer}>
                    <Animation
                        path = {AnimationsPaths.dog}
                        style = {{width: 300}}
                    />

                    <Header
                        method = {'Become a sitter!'}
                    />

                    <BeSitterForm/>
                </View>
           </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>  
    )
}