import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import SchedulesList from './SchedulesList.component';
import { SchedulesProvider, SchedulesConsumer } from './SchedulesContext';
import GlobalStyles from '../../utils/GlobalStyles';

export default function Schedules({navigation})
{
    return(
        <SchedulesProvider>
            <View style = {[GlobalStyles.screenContainer, {margin: 0, marginBottom: 10, marginTop: 20}]}>
                <SchedulesList/>

                <SchedulesConsumer>
                    {({timeRanges, services}) => 
                    {
                        return(
                            <TouchableOpacity 
                            style = {[GlobalStyles.button, {marginBottom: 0, marginTop: 10}]}
                            onPress = {async () => 
                                {      
                                    navigation.navigate('New schedule', 
                                    { 
                                        timeRanges,
                                        services: services.map((service) => ({ id: service.id, serviceName: service.serviceName })),
                                    });
                                }}
                                >
                                <Text status = 'primary'>Add schedule</Text>
                            </TouchableOpacity> 
                        )
                    }}
                
                </SchedulesConsumer>
            </View>  
        </SchedulesProvider>
    )
}