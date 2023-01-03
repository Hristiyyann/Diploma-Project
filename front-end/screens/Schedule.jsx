import React, { useEffect, useState } from 'react';
import { ScrollView, View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useLoading, useShowError } from '../contexts/index';
import apiWrapper from '../requests/ApiWrapper';
import { getServiceTimeRanges, getServices, getSelfSchedule } from '../requests/Sitters';
import { checkForErrors } from '../Utils';
import GlobalStyles from '../GlobalStyles';
import { ScheduleCard } from '../components';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = 
[
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
]

export default function Schedule({navigation})
{
    const [services, setServices] = useState();
    const [dateSchedules, setDateSchedules] = useState();
    const { setIsLoading } = useLoading();
    const { setServerError } = useShowError();

    useEffect(() => 
    {
        fetchServices();
        fetchSchedule();
    }, []);

    async function fetchServices()
    {
        const returnedObject = await apiWrapper(setIsLoading, () => getServices());
        if(!checkForErrors(returnedObject, setServerError, null)) return;
        setServices(returnedObject.data.services);
    }

    async function fetchSchedule(page)
    {
        const returnedObject = await apiWrapper(setIsLoading, () => getSelfSchedule(page));
        if(!checkForErrors(returnedObject, setServerError, null)) return;
        setDateSchedules(returnedObject.data.schedules);
    }

    function renderDates({ item })
    {
        const { date, ...services } = item;

        let dateString = new Date(date);

        return (
            <>
            <Text
                category = 'h5'
                style = {GlobalStyles.centeredText}
            >
                {days[dateString.getDay()]}, {months[dateString.getMonth()]} {dateString.getDate()}, {dateString.getFullYear()} 
            </Text>
            
            {
                Object.keys(services).map((key, index) => 
                {
                    if(!services[key].length) return;
                    
                    return <ScheduleCard
                        key = {index}
                        date = {date}
                        schedules = {services[key]}
                        serviceName = {key}
                    />
                    
                })
            }
            </>
        )
    }
    
    return(
        <View style = {[GlobalStyles.screenContainer, {marginBottom: 8}]}>
               
            <FlatList
                style = {{width: '100%'}}
                data = {dateSchedules}
                renderItem = {renderDates}
                keyExtractor={({index}) => index}
            />
                
            <TouchableOpacity 
                style = {[GlobalStyles.button, {marginTop: 5, marginBottom: 0}]}
                onPress = {async () => 
                {
                    const returnedObject = await apiWrapper(setIsLoading, () => getServiceTimeRanges());
                    if(checkForErrors(returnedObject, setServerError, null))
                    {
                        navigation.navigate('New schedule', 
                        { 
                            data: returnedObject.data.timeRanges,
                            services
                        });
                    }
                }}
            >
                <Text status = 'primary'>Add new schedule</Text>
            </TouchableOpacity>
        </View>  
    )
}