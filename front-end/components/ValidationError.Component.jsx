import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import Icon from './Icon.Component';

export default function ValidationError({message}) 
{
    return(
        <View style = {styles.error}>
            <Icon iconName = {'alert-circle'} size = {20}/>
            <Text category = 'p2'> {message}</Text>
        </View>
    )
}

const styles = StyleSheet.create(
{
    error:
    {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingLeft: 5,
    },
})