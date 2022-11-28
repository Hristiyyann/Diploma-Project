import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import Icon from './Icon.Component';

export default function ProfileOption({iconName, text})
{
    return(
        <TouchableOpacity>
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
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        margin: 10,
    },
})