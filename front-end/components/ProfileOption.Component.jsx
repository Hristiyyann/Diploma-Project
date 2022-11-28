import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import Icon from './Icon.Component';

export default function ProfileOption({iconName, text, onPress})
{
    return(
        <TouchableOpacity
            onPress = {onPress}
        >
            <View style = {styles.option}>
                <Icon iconName = {iconName} size = {30}/>
                <Text category = 'h6'> {text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create(
{
    option:
    {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#D9D9D9',
        borderRadius: 15,
        padding: 10,
        margin: 10,
    },
})