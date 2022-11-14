import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Input} from '@ui-kitten/components';
import Icon from './Icon.Component';

export default function InputField({placeholder, iconName})
{
    return(
      <View style = {styles.container}>
        <Input
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
  }
})