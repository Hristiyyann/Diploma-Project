import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Input } from '@ui-kitten/components';
import Animation from '../components/Lottie.Component';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import Icon from '../components/Icon.Component';
import GlobalStyles from '../GlobalStyles';

export default function ViaEmail()
{
    const [email, setEmail] = useState('');

    return(
        <SafeAreaView style={GlobalStyles.screenContainer}>
            
            <Animation
                path = {AnimationsPaths.viaTelephone}
                style = {{height: 300}}
            />

            <View style = {GlobalStyles.method}>
                <Text
                    status = 'primary'
                    category = 'h4'
                >
                    Password recovery
                </Text>    
            </View>

            <Text 
                style = {styles.text}
                category = 'p1'
            >
                Enter your registered email below to receive recover code
            </Text>

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

        </SafeAreaView>
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