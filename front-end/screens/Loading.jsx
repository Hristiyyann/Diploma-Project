import React from 'react';
import { View } from 'react-native';
import { Animation }  from '../components/index';
import AnimationsPaths from '../assets/animations/AnimationsPaths';

export default function Loading()
{
    return(
        <View style = {GlobalStyles.screenContainer}>
            <Animation
                path = {AnimationsPaths.loading}
                style = {{height: 120}}
            />
        </View>            
    )
}