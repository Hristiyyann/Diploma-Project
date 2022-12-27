import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Datepicker } from '@ui-kitten/components';
import { Header, Animation, DatePicker } from '../components/index';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import GlobalStyles from '../GlobalStyles';

export default function NewSchedule()
{
    const [selectedChoice, setSelectedChoice] = useState(null)

    return(
        <View style = {GlobalStyles.screenContainer}>
            <Animation
                path = {AnimationsPaths.schedule}
                loop = {false}
            />
            <Header
                method = {'New schedule'}
                methodText = {'Pick dates and add your new schedule'}
            />

            {
                selectedChoice == null &&
                <Text
                    category = 'p1'
                >
                Please, select one of the following options
                </Text>
            }

            <View style = {[GlobalStyles.choices, {marginTop: 0}]}>
                <TouchableOpacity 
                    style = {[GlobalStyles.choiceContainer, {height: 60}]}
                    onPress = {() => setSelectedChoice(1)}
                >
                    <View>
                        <Text category = 'h6'>
                            Single date
                        </Text>
                    </View>
                </TouchableOpacity>

                <Text> OR </Text>

                <TouchableOpacity 
                    style = {[GlobalStyles.choiceContainer, {height: 60}]}
                    onPress = {() => setSelectedChoice(2)}
                >
                    <View>
                        <Text category = 'h6'>
                            Multiple dates 
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            {
                selectedChoice != null &&
                (
                    selectedChoice == 1 
                    ? 
                    <View style = {styles.datePickerContainer}>
                        <DatePicker
                            style = {styles.datePicker}
                            label = {'Date of service'}
                        />
                    </View>
                    :
                    <>
                    <View style = {styles.datePickerContainer}>
                        <DatePicker
                            style = {styles.datePicker}
                            label = {'First day of service'}
                        />
                        <DatePicker
                            style = {styles.datePicker}
                            label = {'Last day of service'}
                        />
                    </View>
                    </>
                )
            }

            <View style = {styles.datePickerContainer}>
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
{
    datePicker:
    {
        marginBottom: 10
    },

    datePickerContainer:
    {
        alignSelf: 'stretch'
    },

    selectedChoice:
    {

    }
})