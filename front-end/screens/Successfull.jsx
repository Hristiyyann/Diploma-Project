import React from "react";
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import { Animation } from '../components/index';
import { usePermissions } from '../contexts/index';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import GlobalStyles from '../GlobalStyles';

export default function Successfull({navigation})
{
    const { setIsLoggedIn } = usePermissions();

    return(
        <View style = {GlobalStyles.screenContainer}>
            <Animation
                style = {{width: 300, marginBottom: 30}}
                path = {AnimationsPaths.success}
                loop = {false}
            />

            <Text
                status = 'primary'
                category = 'h5'
                style = {GlobalStyles.centeredText}
            >
                Your password was successfully changed.
            </Text>

            <Text
                status = 'primary'
                category = 'h5'
                style = {GlobalStyles.centeredText}
            >
                Use your new password to login
            </Text>

            <TouchableOpacity 
                    onPress = {() =>
                    {  
                        setIsLoggedIn(false); 
                        navigation.replace('Sign In');
                    }}
                    style = {GlobalStyles.button}
                >
                    <Text 
                        status = 'primary'
                        category = 'h6'
                    >
                        Log in
                    </Text>
            </TouchableOpacity>
        </View>
    )
}