import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Icon({iconName, size})
{
    return(
        <Ionicons 
            name = {iconName} 
            size={size ? size : 32} 
            color='#ec6165' 
        />
    );
}