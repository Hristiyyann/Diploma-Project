import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import SchedulesList from './SchedulesList.component';
import { SchedulesProvider } from './SchedulesContext';
import GlobalStyles from '../../utils/GlobalStyles';

export default function Schedules({navigation})
{
    return(
        <View style = {[GlobalStyles.screenContainer, {margin: 0, marginBottom: 10, marginTop: 20}]}>
            <SchedulesProvider>
                <SchedulesList/>
            </SchedulesProvider>
            
            <TouchableOpacity 
            style = {[GlobalStyles.button, {marginTop: -100, marginBottom: 0}]}
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