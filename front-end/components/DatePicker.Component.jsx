import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Datepicker } from '@ui-kitten/components';
import Icon from './Icon.Component';

export default function DatePicker({style, min, label, onSelect})
{
    const [date, setDate] = useState(min);

    useEffect(() => 
    {
        var newDate = new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000));
        onSelect(newDate);
    }, [date])

    return(
        <View style = {style}>
            <Datepicker
                date = {date}
                initialVisibleDate = {min}
                min = {min}
                onSelect = {newDate => setDate(newDate)}
                accessoryRight = {<Icon iconName = {'calendar'} size = {30}/>}
                label = {label}
            />
        </View> 
    )
}