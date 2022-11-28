import React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { Text, Divider } from '@ui-kitten/components';
import { ProfileOption } from '../components/index';

export default function Profile()
{
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
            
            <ProfileOption
                iconName = {'cog'}
                text = {'Change your data'}
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
            />
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
        marginBottom: 20,
    }
})