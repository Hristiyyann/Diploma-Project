import React, {useState} from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { Text, Divider } from '@ui-kitten/components';
import { useLoading, usePermissions } from '../contexts';
import { apiWrapper } from '../requests/AxiosConfiguration';
import { logOut } from '../requests/Auth';
import { ProfileOption } from '../components/index';

export default function Profile({navigation})
{
    const { setIsLoading } = useLoading();
    const { setIsLoggedIn, setRoles } = usePermissions();

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

                <ProfileOption
                    iconName = {'body'}
                    text = {'Become a sitter!'}
                />

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
        borderRadius: '50%'
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