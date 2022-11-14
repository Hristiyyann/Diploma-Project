import React from 'react';
import {TouchableWithoutFeedback, View, StyleSheet} from 'react-native';
import {Input} from '@ui-kitten/components';
import Icon from './Icon.Component';

export default function PasswordInputField({placeholder, iconName})
{
    const [secureText, setSecureText] = React.useState(true);

    return(
        <View style = {styles.container}>
            <Input
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
            secureTextEntry={secureText}
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