import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TimeRange({startHour, endHour, style})
{
    const [isPressed, setIsPressed] = useState(false);

    useEffect(() => 
    {
       if(isPressed)
       {
            console.log("---------------");
       }
    }, [isPressed])

    return(
        <TouchableOpacity
            style = {styles.timeRange}
            onPress = {() => setIsPressed(!isPressed)}
        >
            <Text>{startHour} - {endHour}</Text>
            <Text>{isPressed ? 'true' : 'false'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create(
{
    timeRange:
    {
        width: '45%',
        padding: 10,
        margin: 5,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black'
    }
})