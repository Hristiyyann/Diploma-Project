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
    const [dateSchedules, setDateSchedules] = useState([]);
    const [isLoadingMoreData, setIsLoadingMoreData] = useState(false);
    const [paginationData, setPaginationData] = useState({page: 1, hasNextPage: null});
    const { setIsLoading } = useLoading();
    const { setServerError } = useShowError();

    useEffect(() => 
    {
        async function fetchServices()
        {
            const returnedObject = await apiWrapper(setIsLoading, () => getServices());
            if(!checkForErrors(returnedObject, setServerError, null)) return;
            setServices(returnedObject.data.services);
        }

        fetchServices();
    }, []);

    useEffect(() => 
    {
        if(paginationData.page > 1)
        {
            fetchSchedule(setIsLoadingMoreData, paginationData.page);
            return
        }
        fetchSchedule(setIsLoading, paginationData.page);
    }, [paginationData.page]);

    async function fetchSchedule(loadingFunction, page)
    {
        const returnedObject = await apiWrapper(loadingFunction, () => getSelfSchedule(page));
        if(!checkForErrors(returnedObject, setServerError, null)) return;

        setPaginationData({...paginationData, hasNextPage: returnedObject.data.hasNextPage});
        setDateSchedules([...dateSchedules, ...returnedObject.data.schedules]);
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

    function loadMoreSchedules() 
    {
        if(!paginationData.hasNextPage) return;
        setPaginationData({...paginationData, page: paginationData.page + 1}); 
    }

    return(
        <View style = {[GlobalStyles.screenContainer, {margin: 0, marginBottom: 10, marginTop: 20}]}>
               
            <FlatList
                style = {{width: '100%'}}
                data = {dateSchedules}
                renderItem = {renderDates}
                keyExtractor={(item, index) => index}
                onEndReached = {loadMoreSchedules}
                onEndReachedThreshold = {0.6}
            />
                
            <TouchableOpacity 
                style = {[GlobalStyles.button, {marginTop: 5, marginBottom: 0}]}
                onPress = {async () => 
                {
                    const returnedObject = await apiWrapper(setIsLoading, () => getServiceTimeRanges());
                    if(!checkForErrors(returnedObject, setServerError, null)) return;
                    
                    navigation.navigate('New schedule', 
                    { 
                        data: returnedObject.data.timeRanges,
                        services
                    });
                }}
            >
                <Text status = 'primary'>Add new schedule</Text>
            </TouchableOpacity>
        </View>  
    )
}