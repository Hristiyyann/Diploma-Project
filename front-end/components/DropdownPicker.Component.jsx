import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Select, SelectItem } from '@ui-kitten/components';

export default function DropdownPicker({placeholder, disabled, label, handleChangedChoice, items})
{
    const [selectedChoice, setSelectedChoice] = useState();

    useEffect(() => 
    {
        if(!selectedChoice) return; 
        handleChangedChoice(items[selectedChoice.row]);
    }, [selectedChoice]);
    
    return(
        <View style={styles.selectContainer}>
            <Select
                placeholder = {placeholder}
                disabled = {disabled}
                selectedIndex = {selectedChoice}
                value = {selectedChoice && items[selectedChoice.row]}
                label = {label}
                onSelect = {(index) => setSelectedChoice(index)}
            >   
                {items.map((item, index) => <SelectItem key = {index} title = {item}/>)}
            </Select>
        </View>
    )
}

const styles = StyleSheet.create(
{
    selectContainer:
    {
        alignSelf: 'stretch',
        marginBottom: 10
    },
});