import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@ui-kitten/components';

export default function ScheduleCard({date, schedules, serviceName})
{
    return(
        <View style = {styles.cardContainer}>
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
    )
}

const styles = StyleSheet.create(
{
    cardContainer:
    {
        borderRadius: 15,
        backgroundColor: '#d9d9d9',
        padding: 15,
        marginBottom: 10
    },

    text:
    {
        marginTop: 3
    }
})