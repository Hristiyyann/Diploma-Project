import React, { useState } from 'react';
import { View } from 'react-native';
import { Datepicker, Text } from '@ui-kitten/components';
import Icon from './Icon.Component';

export default function DatePicker({style, min, label})
{
    const [date, setDate] = useState(min);
   
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