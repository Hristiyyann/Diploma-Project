import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from '@ui-kitten/components';

export default function SitterCard()
{
    return(
        <View style = {styles.card}>
            <View style = {styles.section}>
                <Image
                        source = {require('../assets/man.webp')}
                        style = {styles.photo}      
                    />
                <Text>12 reviews</Text>
                <Text> 5 stars</Text>
            </View>
            <View style = {styles.section}>
                <Text>Jurgen</Text>
                <Text>Sofia, Bulgaria</Text>
                <Text>See more - </Text>
            </View>
            <View style = {styles.section}>
                <Text>From 50 per walk</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
{
    card:
    {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#d9d9d9',
        borderRadius: 15,
        padding: 15,
    },

    section:
    {
        flex: 0.3,
        flexDirection: 'column',
        alignItems: 'center',
    },

    photo:
    {
        height: 85,
        width: 85,
        borderRadius: 50
    }
})