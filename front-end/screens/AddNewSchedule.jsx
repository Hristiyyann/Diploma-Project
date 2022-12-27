import React, { useState } from 'react';
import { View, StyleSheet } from "react-native";
import { Text, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Header, Animation, DatePicker } from '../components/index';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import GlobalStyles from '../GlobalStyles';

const services = ['Dog Walking', 'Drop-in visit'];
const scheduleTypes = ['Single date', 'Multiple dates'];

export default function AddNewSchedule()
{
    const [selectedService, setSelectedService] = useState(new IndexPath(0));
    const [selectedSchedule, setSelectedSchedule] = useState(new IndexPath(0));
    const [date, setDate] = useState(new Date());

    const displayedService = services[selectedService.row];
    const displayedSchedule = scheduleTypes[selectedSchedule.row];

    return(
        <KeyboardAwareScrollView 
            extraScrollHeight = {10}
            contentContainerStyle = {{flexGrow: 1}}
        >   
            <View style = {GlobalStyles.screenContainer}>
                <Animation
                    path = {AnimationsPaths.schedule}
                    loop = {false}
                    style = {{alignSelf: 'center', width: 230}}
                />
                <Header
                    method = {'New schedule'}
                    methodText = {'Pick dates and add your new schedule'}
                />
                
                <View style = {styles.dropDown}>
                    <Select
                        placeholder='Select service'
                        selectedIndex={selectedService}
                        value={displayedService}
                        label = {'Select for which service you will create a schedule'}
                        onSelect={index => setSelectedService(index)}
                    >
                        <SelectItem title='Dog Walking'/>
                        <SelectItem title='Drop-in visit'/>
                    </Select>
                </View>

                <View style = {styles.dropDown}>
                    <Select
                        placeholder='Select shedule'
                        selectedIndex={selectedSchedule}
                        value={displayedSchedule}
                        label = {'Select what type of schedule you will create'}
                        onSelect={index => setSelectedSchedule(index)}
                    >
                        <SelectItem title='Single date'/>
                        <SelectItem title='Multiple dates'/>
                    </Select>
                </View>


                {
                    selectedSchedule.row == 0 
                    ? 
                    <DatePicker
                        style = {styles.datePicker}
                        min = {new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)}
                        label = {'Date of service'}
                    />
                    :
                    <>
                    <DatePicker
                        style = {styles.datePicker}
                        min = {new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)}
                        label = {'First day of service'}
                    />
                    <DatePicker
                        style = {styles.datePicker}
                        min = {new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2)}
                        label = {'Last day of service'}
                    />
                    </>
                } 
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create(
{
    datePicker:
    {
        alignSelf: 'stretch',
        marginBottom: 10,
    },

    dropDown:
    {
        alignSelf: 'stretch',
        marginBottom: 10
    }
});