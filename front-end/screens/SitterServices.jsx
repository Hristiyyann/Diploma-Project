import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Animation, Header, ServiceOption } from '../components/index';
import { useLoading } from '../contexts';
import { apiWrapper } from '../requests/AxiosConfiguration';
import { putServices } from '../requests/Sitters';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import GlobalStyles from '../GlobalStyles';

export default function SitterServices({route})
{
    const [changeData, setChangeData] = useState({});
    const { data } = route.params;
    const { setIsLoading } = useLoading();

    async function sendChangedData()
    {
        await apiWrapper(setIsLoading, () => putServices(changeData));
    }

    return(
        <KeyboardAwareScrollView 
            extraScrollHeight = {10}
            contentContainerStyle = {{flexGrow: 1}}
        >   
            <View style = {GlobalStyles.screenContainer}>
                <Animation
                    path = {AnimationsPaths.servicesChange}
                    loop = {false}
                />

                <Header
                    method = {'Services'}
                    methodText = {'Select the services you will be able to provide to people'}
                />

                {data.map((service, index) =>
                {
                    return <ServiceOption
                        key = {index}
                        serviceId = {service.id}
                        isTurnedOn = {Object.keys(service.sitter_services).length === 0 ? false : true}
                        currentPrice = {service.sitter_services[0]?.price}
                        serviceName = {service.serviceName}
                        changeData = {changeData}
                        setChangeData = {setChangeData}
                    />
                })}

                <TouchableOpacity 
                    onPress = {sendChangedData}
                    style = {GlobalStyles.button}
                >
                    <Text status = 'primary'>Apply changes</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAwareScrollView>

    )
}