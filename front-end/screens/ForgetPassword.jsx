import React from 'react';
import {SafeAreaView, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from '@ui-kitten/components';
import Animation from '../components/Lottie.Component';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import Icon from '../components/Icon.Component';
import GlobalStyles from '../GlobalStyles';

export default function Verification()
{
    return(
        <SafeAreaView
            style = {GlobalStyles.screenContainer}
        >

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
        
                <Text category = 'h6'>
                    via sms: +359000000000
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.optionContainer}>
                <Text>
                    <Icon iconName = {'mail'} size = {45}/>
                </Text>
        
                <Text category = 'h6'>
                    via email: diplomasupport@abv.com
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
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
})