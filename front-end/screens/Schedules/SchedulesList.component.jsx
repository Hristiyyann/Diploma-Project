import React, { useState, useEffect, useRef } from 'react';
import { FlatList } from 'react-native';
import { Text } from '@ui-kitten/components';
import ScheduleCard from './ScheduleCard.component';
import { useSchedulesContext } from './SchedulesContext';
import { useShowError } from '../../contexts/index';

export default function SchedulesList()
{
    const [refresh, setRefresh] = useState(false);
    const [listDataLoading, setListDataLoading] = useState(false);
    const firstRender = useRef(true);
    const 
    { 
        dateSchedules, services, paginationData, setPaginationData, fetchSchedules 
    } = useSchedulesContext();
    const setServerError = useShowError();

    useEffect(() => 
    {      
        if(firstRender.current)
        {
            firstRender.current = false;
            return;
        }

        if(paginationData.page == 1 && !firstRender.current)
        {
            fetchSchedules(setRefresh, setServerError, paginationData.page);
            return;
        }
        
        fetchSchedules(setListDataLoading, setServerError, paginationData.page);
    }, [paginationData.page]);

    function renderDates({ item })
    {
        const { date, ...services } = item;
        
        return (
            <>
            <Text
                category = 'h5'
                style = {GlobalStyles.centeredText}
            >
                { new Intl.DateTimeFormat('en-GB', { dateStyle: 'full'}).format(new Date (date)) }
            </Text>
            
            {
                Object.keys(services).map((key, index) => 
                {
                    if(!services[key].length) return;
                    
                    return <ScheduleCard
                        key = {index}
                        date = {date}
                        serviceName = {key}
                        schedules = {services[key]}
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
        <>
        <FlatList
                style = {{width: '100%'}}
                data = {dateSchedules}
                renderItem = {renderDates}
                keyExtractor={(item, index) => index}
                onEndReached = {loadMoreSchedules}
                onEndReachedThreshold = {0.8}
                onRefresh = {() => setPaginationData({...paginationData, page: 1})}
                refreshing = {refresh}
            />
        </>
    )
}