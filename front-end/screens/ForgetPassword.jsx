import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Text} from '@ui-kitten/components';
import Animation from '../components/Lottie.Component';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import Icon from '../components/Icon.Component';
import GlobalStyles from '../GlobalStyles';

export default function Verification()
{
    return(
        <KeyboardAwareScrollView 
            extraScrollHeight = {5}
            contentContainerStyle = {{flexGrow: 1}}
        >

            <View style = {GlobalStyles.screenContainer}>

            <Animation
                path = {AnimationsPaths.forgotPassword}
            />

            <View style = {GlobalStyles.method}>
                <Text
                    status = 'primary'
                    style = {GlobalStyles.methodText}
                >
                    Forgot Password?
                </Text>

                <Text status = 'basic'>
                    Select whict contact detail should we use to reset your password?
                </Text>
            </View>

            <TouchableOpacity style = {styles.optionContainer}>
                <Text>
                    <Icon iconName = {'call'} size = {45}/>
                </Text>
                <View style = {styles.viaMethod}>
                    <Text category = 'h6'>
                        via sms:
                    </Text>
                    <Text category = 'h6'>
                        +359000000000
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.optionContainer}>
                <Text>
                    <Icon iconName = {'mail'} size = {45}/>
                </Text>

                <View style = {styles.viaMethod}>
                    <Text category = 'h6'>
                        via email: 
                    </Text>
                    <Text category = 'h6'>
                        diplomasupport@abv.com
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    </KeyboardAwareScrollView>
    )    
}

const styles = StyleSheet.create(
{
    optionContainer:
    {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignSelf: 'stretch',
        height: 110,
        backgroundColor: '#D9D9D9',
        marginTop: 20,
        borderRadius: 15
    },

    viaMethod:
    {
        flex: 0.8,
        flexDirection:'column',
    }
})