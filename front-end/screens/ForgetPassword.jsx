import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text } from '@ui-kitten/components';
import { Header, Icon, Animation } from '../components/index';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import GlobalStyles from '../GlobalStyles';

export default function Verification({navigation})
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

                <Header
                    method = {'Forget Password?'}
                    methodText = {'Select whict contact detail should we use to reset your password?'}
                />
                <View style = {styles.options}>

                <TouchableOpacity 
                    onPress = {() => navigation.navigate('Password recovery',
                    {
                        forEmail: false
                    })}
                    style = {styles.optionContainer}>
                    <Text>
                        <Icon iconName = {'call'} size = {45}/>
                    </Text>
                    <View style = {styles.viaMethod}>
                        <Text category = 'h6'>
                            via sms
                        </Text>
                    </View>
                </TouchableOpacity>

                <Text> OR </Text>

                <TouchableOpacity 
                    onPress = {() => navigation.navigate('Password recovery',
                    {
                        forEmail: true,
                    })}
                    style = {styles.optionContainer}>
                    <Text>
                        <Icon iconName = {'mail'} size = {45}/>
                    </Text>

                    <View style = {styles.viaMethod}>
                        <Text category = 'h6'>
                            via email 
                        </Text>
                    </View>
                </TouchableOpacity>
                </View>

            </View>
        </KeyboardAwareScrollView>
    )    
}

const styles = StyleSheet.create(
{
    options:
    {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 10,
    },

    optionContainer:
    {
        flex: 0.5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        height: 110,
        backgroundColor: '#D9D9D9',
        margin: 10,
        borderRadius: 15
    },

   /*  viaMethod:
    {
        flex: 0.8,
        flexDirection:'column',
    } */
})