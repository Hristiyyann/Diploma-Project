import React, { useState, useEffect, createContext, useContext } from 'react';
import { useLoading } from '../../contexts/index';
import apiWrapper from '../../requests/ApiWrapper';
import { getServiceTimeRanges, getSelfSchedule } from '../../requests/Sitters';
import { checkForErrors } from '../../utils/Helpers';

const SchedulesContext = createContext();

function useSchedulesContext() 
{
    return useContext(SchedulesContext);
}

function SchedulesProvider({children})
{  
    const [tryAgain, setTryAgain] = useState(0);
    const [services, setServices] = useState([]);
    const [timeRanges, setTimeRanges] = useState([]);
    const [dateSchedules, setDateSchedules] = useState([]);
    const [initialRenderError, setInitialRenderError] = useState(false);
    const [paginationData, setPaginationData] = useState({page: 1, hasNextPage: null});

    const { setIsLoading } = useLoading();
    
    useEffect(() => 
    {
        fetchServicesAndTimeRanges()
        .then(() => fetchSchedules(setIsLoading, setInitialRenderError, 1))
    }, [tryAgain]);

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

    return(
        <SchedulesContext.Provider 
            value = 
            {{
                setTryAgain, services, timeRanges, dateSchedules, 
                paginationData, setPaginationData, initialRenderError,
                fetchSchedules
            }}
        >
            {children}
        </SchedulesContext.Provider>
    )
};

export { SchedulesProvider,  useSchedulesContext };