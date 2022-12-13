import React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { Text, Divider } from '@ui-kitten/components';
import { ProfileOption } from '../components/index';
import { useLoading, usePermissions } from '../contexts';
import apiWrapper from '../requests/ApiWrapper';
import { logOut } from '../requests/Auth';
import { checkCandidate, getSelfServices, getSelfPets } from '../requests/Sitters';
import { checkUserRolesFor } from '../Utils';

export default function Profile({navigation})
{
    const { setIsLoading } = useLoading();
    const { setIsLoggedIn, setRoles, roles } = usePermissions();

    return( 
        <ScrollView>
            <View style={styles.welcomeSection}>       
                <Image
                    source = {require('../assets/man.webp')}
                    style = {styles.profilePicture}      
                />

                <View
                    style = {styles.timeAndName}
                >
                    <Text
                        category = 'p1'
                    >
                        Good afternoon,
                    </Text>

                    <Text
                        status = 'primary'
                        category = 'h5'
                    >
                        Harold Wilshere
                    </Text>
                </View>    
            </View>

            <Divider
                style = {styles.dividerStyle}
            />
            
            <View style = {styles.options}>
                <ProfileOption
                    iconName = {'cog'}
                    text = {'Change your password'}
                    onPress = {() => navigation.navigate('Change password', { isForgotten: false })}
                />

                <ProfileOption
                    iconName = {'time'}
                    text = {'See your bookings'}
                />

                {
                    !checkUserRolesFor(roles, ['Sitter']) && 
                    <ProfileOption
                        iconName = {'body'}
                        text = {'Become a sitter!'}
                        onPress = {async () => 
                        {
                            const returnedObject = await apiWrapper(setIsLoading, () => checkCandidate());
                            navigation.navigate('Be sitter',
                            {
                                hasError: returnedObject?.success ? false : true,
                                message: returnedObject?.message
                            })
                        }}
                    />
                }

                {
                    checkUserRolesFor(roles, ['Sitter']) &&
                    <ProfileOption
                        iconName = {'options'}
                        text = {'Services settings'}
                        onPress = {async () => 
                        {
                            const returnedObject = await apiWrapper(setIsLoading, () => getSelfServices());
                            if(returnedObject.data.success)
                            {
                                navigation.navigate('Services',
                                {
                                    data: returnedObject.data.services
                                })
                            }
                        }}
                    />
                }

                {
                    checkUserRolesFor(roles, ['Sitter']) &&
                    <ProfileOption
                        iconName = {'options'}
                        text = {'Pet settings'}
                        onPress = {async () => 
                        {
                            const returnedObject = await apiWrapper(setIsLoading, () => getSelfPets());
                            if(returnedObject.data.success)
                            {
                                navigation.navigate('Pets',
                                {
                                    data: returnedObject.data.pets
                                });
                            }
                        }}
                    />
                }
               
                <ProfileOption
                    iconName = {'log-out'}
                    text = {'Log out'}
                    onPress = {async () => await apiWrapper(setIsLoading, () => logOut(setRoles, setIsLoggedIn))}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create(
{
    welcomeSection:
    {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 20
    },

    timeAndName: 
    {
        flex: 0.7,
        flexDirection:'column',
    },

    profilePicture:
    {
        width: 100,
        height: 100,
        borderRadius: 50
    },

    dividerStyle:
    {
        height: 2,
        backgroundColor: '#ec6165',
    },

    options:
    {
        flex: 1,
        flexDirection: 'column',
        margin: 10,
    }
})