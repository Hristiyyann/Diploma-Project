import React, { useState, useEffect } from 'react';
import { View, Switch, StyleSheet} from 'react-native';
import { Text, Input } from '@ui-kitten/components';
import GlobalStyles from '../GlobalStyles';

export default function ServiceSwitch({isTurnedOn, serviceName, serviceId, currentPrice, changeData, setChangeData})
{
    const [isEnabled, setIsEnabled] = useState(isTurnedOn);
    const [price, setPrice] = useState(currentPrice);

    useEffect(()=>
    {
        if(isEnabled)
        {
            setChangeData({...changeData, [serviceId]: {price}})
            return;
        }

        delete changeData[serviceId]; 
        setChangeData({...changeData});
    },[isEnabled, price]);

    return(
        <View style = {styles.section}>
            <Switch
                trackColor = {{ false: '#73423f', true: "#ec6165" }}
                thumbColor = {'#f2f2f2'}
                ios_backgroundColor = "#73423f"
                onValueChange = {() => setIsEnabled(previousState => !previousState)}
                value = {isEnabled}
                />

            <View
                style = {styles.serviceName}
            >
                <Text
                    category = 'h6'
                    status = 'primary'
                >
                   {serviceName}
                </Text>
            </View>
    
            <Input
                style = {[GlobalStyles.input, styles.input]}
                textStyle={GlobalStyles.textInputStyle}
                placeholder = 'Price'
                disabled = {!isEnabled}
                value = {price}
                onChangeText = {(currentValue) => { setPrice(currentValue); }}
            />  
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
        marginTop: 15,
    },

    serviceName:
    {
        marginLeft: 10,
        marginRight: 10,
        flex: 0.8,
        alignItems: 'center',
    },

    input:
    {
        flex: 0.3
    }
})