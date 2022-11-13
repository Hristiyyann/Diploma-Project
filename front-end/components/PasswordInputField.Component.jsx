import React from 'react';
import {Input} from '@ui-kitten/components';
import Icon from './Icon.Component';
import {TouchableWithoutFeedback, View} from 'react-native';

export default function PasswordInputField({placeholder, iconName})
{
    const [secureText, setSecureText] = React.useState(true);

    return(
        <Input
        placeholder = {placeholder}
        caption ={"Your password must be at least 8 characters including one lowercase and uppercase letter, one digit and one symbol"}
        accessoryLeft = {<Icon iconName={iconName}/>}
        accessoryRight=
        {
            <TouchableWithoutFeedback onPress = {() => setSecureText(!secureText)}>
                <View>
                <Icon iconName={secureText ? "eye-outline" : "eye-off-outline"}/>
                </View>
            </TouchableWithoutFeedback>
        }
        secureTextEntry={secureText}
      /> 
    );    
}