import React, { useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Input } from '@ui-kitten/components';
import Icon from './Icon.Component';
import GlobalStyles from '../GlobalStyles';

export default function PasswordInputField({field, form, ...props})
{
    const [secureText, setSecureText] = useState(true);
    
    return(
        <View style = {GlobalStyles.inputContainer}>
            <Input
                style = {GlobalStyles.input}
                textStyle={GlobalStyles.textInputStyle}
                placeholder = {props.placeholder}
                accessoryLeft = {<Icon iconName={'lock-closed'}/>}
                accessoryRight=
                {
                    <TouchableWithoutFeedback onPress = {() => setSecureText(!secureText)}>
                        <View>
                            <Icon iconName={secureText ? "eye" : "eye-off"}/>
                        </View>
                    </TouchableWithoutFeedback>
                }
                onChangeText = {(currentValue) => form.setFieldValue(field.name, currentValue)}
                secureTextEntry={secureText}
            />
        </View> 
    );    
}