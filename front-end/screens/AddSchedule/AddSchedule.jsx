import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text  } from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useLoading, useShowError } from '../../contexts/index';
import { putSelfSchedule } from '../../requests/Sitters';
import apiWrapper from '../../requests/ApiWrapper';
import { Header, Animation, DatePicker, DropdownPicker, TimeRange } from '../../components/index';
import AnimationsPaths from '../../assets/animations/AnimationsPaths';
import GlobalStyles from '../../utils/GlobalStyles';
import { checkForErrors } from '../../utils/Helpers';

const date = new Date();

export default function AddSchedule({navigation, route})
{
    const { timeRanges, services } = route.params;
    const { setIsLoading } = useLoading();
    const { setServerError } = useShowError();
    const [changedData, setChangedData] = useState(
    {
        serviceName: '',
        scheduleName: '',
        firstDay: '', 
        lastDay: '',
        timeRanges: {}
    });

    const timeRangesLength = Object.keys(changedData.timeRanges).length;

    function handleServiceChange(serviceName) { setChangedData((changedData) => ({...changedData, serviceName})); }
    function handleScheduleChange(scheduleName) { setChangedData((changedData) => ({...changedData, scheduleName})); }
    function handleFirstDayChange(firstDay) { setChangedData((changedData) => ({...changedData, firstDay})); }
    function handleLastDayChange(lastDay) { setChangedData((changedData) => ({...changedData, lastDay})); }
    function handleDateOfServiceChange(date) { setChangedData((changedData) => ({...changedData, firstDay: date, lastDay: date})); }

    function renderTimeRanges(serviceName)
    {
        if(!serviceName) return;

        return(
            <View 
                style = {styles.timeRangesContainer}
            >

            {
                timeRanges[serviceName].map((timeRange, index) =>
                {
                    return(
                        <TimeRange
                            key = {index}
                            startHour = {timeRange.startHour}
                            endHour = {timeRange.endHour}
                            timeRangeId = {timeRange.id}
                            setChangedData = {setChangedData}
                        />
                    )
                })
            }

            </View>
        )
    }

    async function sendData()
    {
        const { scheduleName, serviceName, ...rest } = changedData;
        const service = services.filter((service) => service.serviceName == changedData.serviceName);
        const values = { ...rest, serviceId: service[0].id };

        const response = await apiWrapper(setIsLoading, () => putSelfSchedule(values));
        if(!checkForErrors(response, setServerError, null)) return;
        
        navigation.goBack();
    }

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
                
                <DropdownPicker
                    placeholder = {'Select service'}
                    disabled = {timeRangesLength ? true : false}
                    label = {'Select for which service you will create a schedule'}
                    items = {services.map(item => item.serviceName)}
                    handleChangedChoice = {handleServiceChange}
                />

                <DropdownPicker
                    placeholder= {'Select schedule'}
                    label = {'Select what type of schedule you will create'}
                    items = {['Single date', 'Multiple dates']}
                    handleChangedChoice = {handleScheduleChange}
                />            
                
                {
                    changedData.scheduleName == 'Single date' 
                    ? 
                    <DatePicker
                        min = {new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)}
                        label = {'Date of service'}
                        onSelect = {handleDateOfServiceChange}
                    />
                    :
                    <>
                    <DatePicker
                        min = {new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)}
                        label = {'First day of service'}
                        onSelect = {handleFirstDayChange}
                    />
                    <DatePicker
                        min = {new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2)}
                        label = {'Last day of service'}
                        onSelect = {handleLastDayChange}
                    />
                    </>
                }
                
                { renderTimeRanges(changedData.serviceName) }

                <TouchableOpacity 
                    disabled = {(timeRangesLength && changedData.scheduleName != '') ? false : true}
                    style = {[GlobalStyles.button, (!timeRangesLength || changedData.scheduleName == '') && {opacity: 0.4}]}
                    onPress = {() => sendData()}
                >
                    <Text status = 'primary'>Add schedule</Text>
                </TouchableOpacity> 
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create(
{
    timeRangesContainer:
    {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }
});