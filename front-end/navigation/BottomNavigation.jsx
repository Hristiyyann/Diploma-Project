import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile, Search } from '../screens/index';
import { Icon } from '../components/index';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigation({isLoggedIn})
{
    return(
        <BottomTab.Navigator
            initialRouteName={Search}
            screenOptions={({ route }) => 
            ({
                headerStyle: 
                {
                    backgroundColor: '#73423f',
                },
                headerTintColor: '#ec6165',
                headerTitleStyle:
                {
                    fontWeight: 'bold',
                },
                tabBarIcon: ({ focused, size }) => 
                {
                    let iconName;
                    let name = route.name;

                    if (name == 'Search') 
                    {
                        iconName = focused ? 'search' : 'search-outline';
                    } 
                    else if (name == 'Profile') 
                    {
                        iconName = focused ? 'person' : 'person-outline';
                    } 
                    
                    return <Icon iconName={iconName} size = {size}/>
                },
                tabBarActiveTintColor: '#ec6165',
                tabBarInactiveTintColor: '#ec6165',
                tabBarStyle:
                {
                    backgroundColor: '#73423f',
                }
            })}
        >
            <BottomTab.Screen 
                name = 'Search' 
                component={Search}
                options={{ headerShown: false }}
            />
            <BottomTab.Screen 
                name = 'Profile' 
                component={Profile}
            />
        </BottomTab.Navigator>
    )
}