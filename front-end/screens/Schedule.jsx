import React, { useEffect, useState } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useLoading, useShowError } from '../contexts/index';
import apiWrapper from '../requests/ApiWrapper';
import { getServiceTimeRanges } from '../requests/Sitters';
import { checkForErrors } from '../Utils';
import GlobalStyles from '../GlobalStyles';

export default function Schedule({navigation})
{
    const [date, setDate] = React.useState(new Date());
    const [data, setData] = useState({});
    const { setIsLoading } = useLoading();
    const { setServerError } = useShowError();

    useEffect(() => 
    {
        async function fetchSchedules()
        {
            const returnedObject = await apiWrapper(setIsLoading, () => getSelfSchedule());
            if(checkForErrors(returnedObject, setServerError, null))
            {  
                setData(returnedObject.data.schedules);
            }
        }
    
        fetchSchedules();
        console.log(data);
    }, [])

    return(
        <View style={GlobalStyles.screenContainer}>
            <ScrollView
                style = {{alignSelf: 'stretch'}}
            >
                <Text>Main</Text>
            </ScrollView>
            
            <TouchableOpacity 
                style = {[GlobalStyles.button, {marginTop: 5, marginBottom: 5}]}
                onPress = {async () => 
                {
                    const returnedObject = await apiWrapper(setIsLoading, () => getServiceTimeRanges());
                    if(checkForErrors(returnedObject, setServerError, null))
                    {
                        navigation.navigate('New schedule', { data: returnedObject.data.timeRanges });
                    }
                }}
            >
                <Text status = 'primary'>Add new schedule</Text>
            </TouchableOpacity>
            
        </View>
    )
}