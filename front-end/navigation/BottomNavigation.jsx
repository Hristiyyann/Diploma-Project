import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { usePermissions } from '../contexts/index';
import { Profile, Search, Schedule } from '../screens/index';
import { Icon } from '../components/index';
import { checkUserRolesFor } from '../Utils';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigation()
{
    const { roles } = usePermissions();

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
                    else if(name == 'Schedule')
                    {
                        iconName = focused ? 'calendar' : 'calendar-outline';
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
            {
                checkUserRolesFor(roles, ['Sitter']) &&
                <BottomTab.Screen 
                    name = 'Schedule' 
                    component={Schedule}
                />
            }
            <BottomTab.Screen 
                name = 'Profile' 
                component={Profile}
            />
        </BottomTab.Navigator>
    )
}