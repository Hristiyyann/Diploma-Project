import React, { useState, useEffect } from 'react';
import { View, Switch, StyleSheet} from 'react-native';
import { Text } from '@ui-kitten/components';

export default function PetOption({isTurnedOn, petName, petId, changeData, setChangeData})
{
    const [isEnabled, setIsEnabled] = useState(isTurnedOn);
    const initialState = isTurnedOn;

    useEffect(()=>
    {
        if(isEnabled != initialState)
        { 
            setChangeData({...changeData, [petId]: { isEnabled }});
            return;
        }
        else
        {
            delete changeData[petId];
            setChangeData({...changeData}); 
        }
    }, [isEnabled]);

    return(
        <View style = {styles.section}>
            <Switch
                trackColor = {{ false: '#73423f', true: "#ec6165" }}
                thumbColor = {'#f2f2f2'}
                ios_backgroundColor = "#73423f"
                onValueChange = {() => setIsEnabled(previousState => !previousState) }
                value = {isEnabled}
                />

            <View
                style = {styles.serviceName}
            >
                <Text
                    category = 'h6'
                    status = 'primary'
                >
                {petName}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create
({
    section:
    {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 20,
    },

    serviceName:
    {
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
        alignItems: 'center',
    },
});