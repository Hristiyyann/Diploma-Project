import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Icon({iconName})
{
    return(
        <Ionicons name = {iconName} size={30} color="green" />
    );
}