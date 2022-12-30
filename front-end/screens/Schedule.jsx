import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useLoading, useShowError } from '../contexts/index';
import apiWrapper from '../requests/ApiWrapper';
import { getServiceTimeRanges, getServices } from '../requests/Sitters';
import { checkForErrors } from '../Utils';
import GlobalStyles from '../GlobalStyles';

export default function Schedule({navigation})
{
    const [services, setServices] = useState();
    const { setIsLoading } = useLoading();
    const { setServerError } = useShowError();

    async function fetchServices()
    {
        const returnedObject = await apiWrapper(setIsLoading, () => getServices());
        setServices(returnedObject.data.services);
    }
   
    useEffect(() => 
    {
        fetchServices();
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