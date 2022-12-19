import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import Icon from './Icon.Component';

export default function FormError({message})
{
    return(
        <View style={styles.container}>
            <Icon iconName = {'alert-circle'} size = {25}/>
            <Text> {message}</Text>
        </View>
    )
}

const styles = StyleSheet.create
({
    container:
    {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ec6165',
        padding: 7,
        backgroundColor: '#D9D9D9'
    }
})