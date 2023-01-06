import React from "react";
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useNavigation } from "@react-navigation/native";
import { Animation } from '../components/index';
import { usePermissions } from '../contexts/index';
import GlobalStyles from '../GlobalStyles';

export default function Successful({route})
{
    const { setIsLoggedIn, isLoggedIn } = usePermissions();
    const { path, firstText, secondText, needLogIn, buttonText} = route.params;
    const navigation = useNavigation();

    return(
        <View style = {GlobalStyles.screenContainer}>
            <Animation
                style = {{width: 300, marginBottom: 30}}
                path = {path}
                loop = {false}
            />

            <Text
                status = 'primary'
                category = 'h5'
                style = {GlobalStyles.centeredText}
            >
                {firstText}
            </Text>

            {
            secondText &&
            <Text
                status = 'primary'
                category = 'h5'
                style = {GlobalStyles.centeredText}
            >
                {secondText}
            </Text>
            }

            <TouchableOpacity 
                onPress = {() => 
                {
                    needLogIn ? 
                    ( isLoggedIn ? setIsLoggedIn(false) : navigation.replace('Sign In'))
                    : 
                    navigation.navigate('Root', {screen: 'Search'});
                }}
                style = {GlobalStyles.button}
            >
                <Text 
                    status = 'primary'
                    category = 'h6'
                >
                    {buttonText}
                </Text>
            </TouchableOpacity>
        </View>
    )
}