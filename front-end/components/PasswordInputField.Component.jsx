import React from 'react';
import {TouchableWithoutFeedback, View, StyleSheet} from 'react-native';
import {Input} from '@ui-kitten/components';
import Icon from './Icon.Component';
import GlobalStyles from '../GlobalStyles';

export default function PasswordInputField({placeholder, iconName, onChange})
{
    const [secureText, setSecureText] = React.useState(true);

    return(
        <View style = {GlobalStyles.inputContainer}>
            <Input
            style = {GlobalStyles.input}
            placeholder = {placeholder}
            accessoryLeft = {<Icon iconName={iconName}/>}
            accessoryRight=
            {
                <TouchableWithoutFeedback onPress = {() => setSecureText(!secureText)}>
                    <View>
                    <Icon iconName={secureText ? "eye" : "eye-off"}/>
                    </View>
                </TouchableWithoutFeedback>
            }
            onChangeText = {(currentValue) => onChange(currentValue)}
            secureTextEntry={secureText}
            />
        </View> 
    );    
}