import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Animation, Header, PetOption } from '../components/index';
import { useLoading } from '../contexts';
import apiWrapper from '../requests/ApiWrapper';
import { putSelfPets } from '../requests/Sitters';
import AnimationsPaths from '../assets/animations/AnimationsPaths';
import GlobalStyles from '../GlobalStyles';

export default function SitterPets({route})
{
    const [changeData, setChangeData] = useState({});
    const { data } = route.params;
    const { setIsLoading } = useLoading();

    async function sendChangedData()
    {
        console.log(changeData);
        await apiWrapper(setIsLoading, () => putSelfPets(changeData));
    }

    return(
        <KeyboardAwareScrollView 
            extraScrollHeight = {10}
            contentContainerStyle = {{flexGrow: 1}}
        >   
            <View style = {GlobalStyles.screenContainer}>
                <Animation
                    path = {AnimationsPaths.pets}
                    loop = {false}
                />
                
                <Header
                    method = {'Pets'}
                    methodText = {'Select the the pets you would like to take care of'}
                />
                
                {data.map((pet, index) =>
                    {
                        return <PetOption
                            key = {index}
                            isTurnedOn = {Object.keys(pet.sitter_pet_criteria).length === 0 ? false : true}
                            petId = {pet.id}
                            petName = {pet.petName}
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