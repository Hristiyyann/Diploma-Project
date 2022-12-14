import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';

export default function Animation({path, style, loop}) 
{
    const animation = useRef();
   
    useEffect(() => 
    {
        setTimeout(() => animation.current?.play());

        return () => 
        {
            animation.current?.reset();
        }
        
    }, []);

    return(
       <View>
            <Lottie
                style={style ? style : styles.lottie}
                source={path}
                ref={animation} 
                loop = {loop == false ? loop : true}
            /> 
        </View>
    )
}

const styles = StyleSheet.create(
{
    lottie:
    {
        width: 230,
        height: 230
    }
});
