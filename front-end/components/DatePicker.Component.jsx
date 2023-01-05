import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Datepicker } from '@ui-kitten/components';
import Icon from './Icon.Component';

export default function DatePicker({min, label, onSelect})
{
    const [date, setDate] = useState(min);

    useEffect(() => 
    {
        onSelect(new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000)));
    }, [date])

    return(
        <View style = {styles.datePickerContainer}>
            <Datepicker
                date = {date}
                initialVisibleDate = {min}
                min = {min}
                max={new Date(2024, 0, 0)}
                onSelect = {newDate => setDate(newDate)}
                accessoryRight = {<Icon iconName = {'calendar'} size = {30}/>}
                label = {label}
            />
        </View> 
    )
}

const styles = StyleSheet.create(
{
    datePickerContainer:
    {
        alignSelf: 'stretch',
        marginBottom: 10,
    },
});