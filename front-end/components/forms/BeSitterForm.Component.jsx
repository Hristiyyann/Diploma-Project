import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { Input } from '@ui-kitten/components';
import Icon from '../Icon.Component';
import ValidationError from '../ValidationError.Component';
import GlobalStyles from '../../GlobalStyles';

export default function BeSitterForm()
{
    return(
        <Formik
            initialValues = 
            {{
                city: '',
                about: '',
            }}
            onSubmit = {(values) =>
            {
                console.log(values);
            }}
        >
            {(props) => 
            (
                <>
                <View style = {GlobalStyles.inputContainer}>
                        <Input
                            style = {GlobalStyles.input}
                            textStyle={GlobalStyles.textInputStyle}
                            caption = {'Indicate the city most convenient for you, where you will be able to take care of an animal'}
                            placeholder = {'Place'}
                            accessoryLeft = {<Icon iconName = {'map'}/>}
                            onChangeText = {props.handleChange('city')}
                        />
                </View>

                <View style = {GlobalStyles.inputContainer}>
                    <Input
                        multiline = {true}
                        style = {GlobalStyles.input}
                        textStyle={{minHeight: 200}}
                        caption = {'Write about your experience with animals and tell us about your motivation to become a caretaker.'}
                        accessoryLeft = {<Icon iconName = {'information'}/>}
                        onChangeText = {props.handleChange('about')}
                    />
                </View>

                <TouchableOpacity 
                    onPress = {props.handleSubmit}
                    style = {GlobalStyles.button}
                >
                    <Text status = 'primary'>Apply</Text>
                </TouchableOpacity>
                </>
            )}
        </Formik>
    )
}