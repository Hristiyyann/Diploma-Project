import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';

export default function Header({method, methodText, endText, navigateTo})
{
    return(
        <View style = {styles.method}>
            <Text
                status = 'primary'
                category = 'h1'
            >
                {method}
            </Text>    

            <View style = {styles.methodText}>
                <Text 
                    category = 'p1'
                    >
                    {methodText}
                </Text>
                {
                    endText &&  
                    <TouchableOpacity
                        onPress = {navigateTo}
                    >
                        <Text 
                            status = 'primary'> {endText}
                        </Text>
                    </TouchableOpacity>
                }
            </View>
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

    methodText:
    {
        flexDirection: 'row',
        alignItems: 'center'
    }
})