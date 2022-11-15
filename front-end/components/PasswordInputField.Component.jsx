import React from 'react';
import {TouchableWithoutFeedback, View, StyleSheet} from 'react-native';
import {Input} from '@ui-kitten/components';
import Icon from './Icon.Component';

export default function PasswordInputField({placeholder, iconName, onChange})
{
    const [secureText, setSecureText] = React.useState(true);

    return(
        <View style = {styles.container}>
            <Input
            style = {styles.input}
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
        borderWidth: 0,
        backgroundColor: '#D9D9D9',
    }
})