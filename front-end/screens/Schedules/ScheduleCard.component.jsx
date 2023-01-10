import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { Icon } from '../../components/index';

export default function ScheduleCard({date, schedules, serviceName, timeRanges})
{
    return(
        <View style = {styles.cardContainer}>
            <View>
                <View style = {styles.text}>
                    <Text
                        category = 'h6'
                        status = 'primary'
                    >
                        {serviceName}
                    </Text>
                </View>

                <View
                    style = {styles.text}
                >
                    <Text
                        category = 'p1'
                    >
                        {schedules[0].startHour} - {schedules[0].endHour}
                    </Text>
                </View>

                {
                    schedules.length > 1 &&
                    <TouchableOpacity>
                        <Text>and {schedules.length - 1} more </Text>
                    </TouchableOpacity>
                }
            </View>
            <View style = {styles.icon}>
                <TouchableOpacity>
                    <Icon iconName={'options'} size = {28}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create(
{
    cardContainer:
    {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#d9d9d9',
        padding: 15,
        marginBottom: 10,
        marginRight: 20,
        marginLeft: 20,
    },

    text:
    {
        marginTop: 3
    },

    icon:
    {
        marginRight: 10
    }
});