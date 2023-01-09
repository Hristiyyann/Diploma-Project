import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { Text } from '@ui-kitten/components';
import ScheduleCard from './ScheduleCard.component';
import { useLoading, useShowError } from '../../contexts/index';
import apiWrapper from '../../requests/ApiWrapper';
import { getServiceTimeRanges, getSelfSchedule } from '../../requests/Sitters';
import { checkForErrors } from '../../utils/Helpers';
import GlobalStyles from '../../utils/GlobalStyles';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = 
[
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
];

export default function Schedules({navigation})
{
    const [services, setServices] = useState([]);
    const [timeRanges, setTimeRanges] = useState([]);
    const [dateSchedules, setDateSchedules] = useState([]);
    const [listDataLoading, setListDataLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [initialRenderError, setInitialRenderError] = useState();
    const [paginationData, setPaginationData] = useState({page: 1, hasNextPage: null});
    const firstRender = useRef(true);
    const { setIsLoading } = useLoading();
    const { setServerError } = useShowError();
    
    useEffect(() => 
    {      
        if(paginationData.page == 1 && !firstRender.current)
        {
            fetchSchedules(setRefresh, setServerError, paginationData.page);
            return;
        }

        if(paginationData.page > 1)
        {
            fetchSchedules(setListDataLoading, setServerError, paginationData.page);
            return
        }
       
        fetchServicesAndTimeRanges()
        .then(() => fetchSchedules(setIsLoading, setInitialRenderError, paginationData.page))

        firstRender.current = false;
    }, [paginationData.page]);

    async function fetchSchedules(loadingFunction, errorState, page)
    {
        const response = await apiWrapper(loadingFunction, () => getSelfSchedule(page));
        if(!checkForErrors(response, errorState, null)) return;

        setPaginationData({...paginationData, hasNextPage: response.hasNextPage});
        
        if(page == 1)
        {
            setDateSchedules(response.schedules);
            return; 
        }
        
        setDateSchedules([...dateSchedules, ...response.schedules]);
    }

    async function fetchServicesAndTimeRanges()
    {
        const response = await apiWrapper(setIsLoading, () => getServiceTimeRanges());

        if(!checkForErrors(response, setInitialRenderError, null)) return reject();

        let timeRangesForAdd = {};

        response.services.forEach((service) => 
        (
            timeRangesForAdd = {...timeRangesForAdd, [service.serviceName]: service.time_ranges}
        ));

        setServices(response.services);
        setTimeRanges(timeRangesForAdd);
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
                        timeRanges = {timeRanges[key]}
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
                onRefresh = {() => setPaginationData({...paginationData, page: 1})}
                refreshing = {refresh}
            />
                
            <TouchableOpacity 
                style = {[GlobalStyles.button, {marginTop: 5, marginBottom: 0}]}
                onPress = {async () => 
                {      
                    navigation.navigate('New schedule', 
                    { 
                        timeRanges,
                        services: services.map((service) => ({ id: service.id, serviceName: service.serviceName })),
                    });
                }}
            >
                <Text status = 'primary'>Add new schedule</Text>
            </TouchableOpacity>
        </View>  
    )
}