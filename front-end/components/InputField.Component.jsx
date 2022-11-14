import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Input} from '@ui-kitten/components';
import Icon from './Icon.Component';

export default function InputField({placeholder, iconName})
{
    return(
      <View style = {styles.container}>
        <Input
        style = {styles.input}
        placeholder = {placeholder}
        accessoryLeft = {<Icon iconName = {iconName}/>}
        /> 
      </View>
    );
}

const styles = StyleSheet.create(
{
  container: 
  {
    alignSelf: 'stretch',
    marginTop:10,
  },
  
  input:
  {
    borderRadius: 15,
    backgroundColor: '#D9D9D9',
  }
})