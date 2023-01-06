import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { Input } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { BeSitterSchema } from '../../validations/Schemes';
import { postCandidates } from '../../requests/Sitters';
import apiWrapper from '../../requests/ApiWrapper';
import { useLoading, useShowError } from '../../contexts/index';
import Icon from '../Icon.Component';
import ValidationError from '../ValidationError.Component';
import FormError from '../FormError.Component';
import { checkForErrors } from '../../Utils';
import AnimationsPaths from '../../assets/animations/AnimationsPaths';
import GlobalStyles from '../../GlobalStyles';

export default function BeSitterForm()
{
    const [formError, setFormError] = useState(null);
    const { setIsLoading } = useLoading();
    const { setServerError } = useShowError();
    const navigation = useNavigation();

    return(
        <Formik
            initialValues = 
            {{
                city: '',
                about: '',
            }}
            validationSchema = {BeSitterSchema}
            onSubmit = {async (values) =>
            {
                const response = await apiWrapper(setIsLoading, () => postCandidates(values));
                if(checkForErrors(response, setServerError, setFormError))
                { 
                    navigation.navigate('Successful', 
                    {
                        path: AnimationsPaths.successApplication,
                        firstText: 'You have successfully applied!',
                        secondText: 'Please wait for a response from our administrator',
                        needLogIn: false,
                        buttonText: 'Going back'
                    })
                }
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

                { props.touched.city && props.errors.city && <ValidationError message = {props.errors.city}/> }

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

                { props.touched.about && props.errors.about && <ValidationError message = {props.errors.about}/> }

                {formError && <FormError message = {formError}/>}

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