import React, { useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Animation, Header, ServiceSwitch } from '../components/index';
import AnimationsPaths from '../assets/animations/AnimationsPaths';

export default function SitterServices({route})
{
    const { data } = route.params;
    const [changeData, setChangeData] = useState({});

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
                    return <ServiceSwitch
                        key = {index}
                        serviceId = {service.id}
                        isTurnedOn = {Object.keys(service.sitter_services).length === 0 ? false: true}
                        currentPrice = {service.sitter_services[0]?.price}
                        serviceName = {service.serviceName}
                        changeData = {changeData}
                        setChangeData = {setChangeData}
                    />
                })}
            </View>
        </KeyboardAwareScrollView>

    )
}