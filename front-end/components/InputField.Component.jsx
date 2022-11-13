import React from 'react';
import {Input} from '@ui-kitten/components';
import Icon from './Icon.Component';

export default function InputField({placeholder, iconName})
{
    return(
      <Input
      placeholder = {placeholder}
      accessoryLeft = {<Icon iconName = {iconName}/>}
      /> 
    );
}