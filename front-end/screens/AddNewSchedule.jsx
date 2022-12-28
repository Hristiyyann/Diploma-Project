import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Header, Animation, DatePicker, TimeRange } from '../components/index';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import GlobalStyles from '../GlobalStyles';

const scheduleTypes = ['Single date', 'Multiple dates'];
const date = new Date();

export default function AddNewSchedule({route})
{
    const [selectedService, setSelectedService] = useState(new IndexPath(0));
    const [selectedSchedule, setSelectedSchedule] = useState(new IndexPath(0));
    const [services, setServices] = useState([]);
    const { data } = route.params;

    let displayedService = services[selectedService.row]?.name;
    let displayedSchedule = scheduleTypes[selectedSchedule.row];

    const [changedData, setChangedData] = useState(
    {
        serviceId: '',
        firstDay: '', 
        lastDay: '',
        timeRanges: {}
    });

    useEffect(() => 
    {
        setServices([]);
        for(const service of data)
        {
            setServices((prevServices) => [...prevServices, { id: service.id, name: service.serviceName}]);
        }
        setChangedData((changedData) => ({...changedData, serviceId: services[0]?.id}))
    }, []);

    function handleServiceChange(index)
    {
        setSelectedService(index);
        setChangedData((changedData) => ({...changedData, serviceId: services[index.row].id}));
    }

    function handleFirstDayChange(date)
    {
        setChangedData((changedData) => ({...changedData, firstDay: date}));
    }

    function handleLastDayChange(date)
    {
        setChangedData((changedData) => ({...changedData, lastDay: date}));
    }

    function handleDateOfServiceChange(date)
    {
        setChangedData((changedData) => ({...changedData, firstDay: date, lastDay: date}));
    }

    function renderTimeRanges(serviceName)
    {
        return(
            data.filter((service) =>
            {
               return service.serviceName == serviceName
            }).map((service, index) =>
            {
                return(
                    <View 
                        key = {index}
                        style = {styles.timeRangesContainer}
                    >
                    {
                        service.time_ranges.map((timeRange, index) =>
                        {
                            return <TimeRange
                                key = {index}
                                startHour = {timeRange.startHour}
                                endHour = {timeRange.endHour}
                                timeRangeId = {timeRange.id}
                                setChangedData = {setChangedData}
                            />
                        })
                    }
                    </View>
                )
            })
        )
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
                
                <View style = {styles.dropDown}>
                    <Select
                        placeholder='Select service'
                        selectedIndex = {selectedService}
                        value = {displayedService} 
                        label = {'Select for which service you will create a schedule'}
                        onSelect={(index) => handleServiceChange(index)}
                    >
                        <SelectItem title='Dog Walking'/>
                        <SelectItem title='Drop-in visit'/>
                    </Select>
                </View>

                <View style = {styles.dropDown}>
                    <Select
                        placeholder='Select shedule'
                        selectedIndex={selectedSchedule}
                        value={displayedSchedule}
                        label = {'Select what type of schedule you will create'}
                        onSelect={index => setSelectedSchedule(index)}
                    >
                        <SelectItem title='Single date'/>
                        <SelectItem title='Multiple dates'/>
                    </Select>
                </View>

                {
                    selectedSchedule.row == 0 
                    ? 
                    <DatePicker
                        style = {styles.datePicker}
                        min = {new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)}
                        label = {'Date of service'}
                        onSelect = {handleDateOfServiceChange}
                    />
                    :
                    <>
                    <DatePicker
                        style = {styles.datePicker}
                        min = {new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)}
                        label = {'First day of service'}
                        onSelect = {handleFirstDayChange}
                    />
                    <DatePicker
                        style = {styles.datePicker}
                        min = {new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2)}
                        label = {'Last day of service'}
                        onSelect = {handleLastDayChange}
                    />
                    </>
                }
                
                { renderTimeRanges(displayedService) }

                <TouchableOpacity 
                    style = {GlobalStyles.button}
                    onPress = {() => 
                    {
                        console.log(changedData);
                    }}
                >
                    <Text status = 'primary'>Add schedule</Text>
                </TouchableOpacity>
                
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create(
{
    datePicker:
    {
        alignSelf: 'stretch',
        marginBottom: 10,
    },

    dropDown:
    {
        alignSelf: 'stretch',
        marginBottom: 10
    },

    timeRangesContainer:
    {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
});