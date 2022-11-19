import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

export default function Header({method, methodText, endText})
{
    return(
        <View style = {styles.method}>
            <Text
                status = 'primary'
                category = 'h1'
            >
                {method}
            </Text>    

            <Text 
                category = 'p1'
            >
                {methodText}
                {endText && <Text status = 'primary'> {endText}</Text>}
            </Text>
        </View>
    )
};

const styles = StyleSheet.create(
{
    method:
    {
        alignSelf: 'flex-start',
        paddingLeft: 5,
        marginTop: 15,
        marginBottom: 10
    },
})