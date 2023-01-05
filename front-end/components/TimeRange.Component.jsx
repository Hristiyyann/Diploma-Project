import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@ui-kitten/components';

export default function TimeRange({startHour, endHour, timeRangeId, setChangedData})
{
    const [isPressed, setIsPressed] = useState(false);
    const firstRender = useRef(true);

    useEffect(() => 
    {
        if(firstRender.current)
        {
            firstRender.current = false;
            return;
        }

        if(isPressed)
        {
            setChangedData(changedData => ({...changedData, timeRanges: {...changedData.timeRanges, [timeRangeId]: isPressed}}));
            return;
        }

        setChangedData(changedData => 
        {
            delete changedData.timeRanges[timeRangeId];
            return {...changedData};
        });
    }, [isPressed])

    return(
        <TouchableOpacity
            style = {[styles.timeRange, isPressed ? styles.pressed : styles.notPressed]}
            onPress = {() => setIsPressed(!isPressed)}
        >
            <Text
                category = 'p1'
                status = {isPressed ? 'basic' : 'primary'}
            >{startHour} - {endHour}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create(
{
    timeRange:
    {
        width: '45%',
        padding: 13,
        margin: 5,
        alignItems: 'center',
        borderRadius: 15,
    },

    pressed:
    {
        backgroundColor: '#73423f',
    },

    notPressed:
    {
        backgroundColor: '#d9d9d9',
    }
});