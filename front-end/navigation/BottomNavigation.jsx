import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { usePermissions } from '../contexts/index';
import 
{ 
    Profile, Search, Schedule, ChangePassword, BeSitter, SitterServices,
    SitterPets, NewSchedule
} from '../screens/index';
import { Icon } from '../components/index';
import { checkUserRolesFor } from '../Utils';

const headerOptions = 
{
    headerStyle: 
    {
        backgroundColor: '#73423f',
    },
    headerTintColor: '#ec6165',
    headerTitleStyle:
    {
        fontWeight: 'bold',
    },
}

const ProfileStack = createNativeStackNavigator();

function ProfileStackScreen()
{
    return(
        <ProfileStack.Navigator
            screenOptions={headerOptions}
        >
            <ProfileStack.Screen
                options = {{title: 'Profile'}}
                name = 'ProfileScreen'
                component={Profile}
            />
            <ProfileStack.Screen 
                name = 'Change password' 
                component = {ChangePassword}
            />
            <ProfileStack.Screen 
                name = 'Be sitter' 
                component = {BeSitter}
            />
            <ProfileStack.Screen 
                name = 'Services' 
                component = {SitterServices}
            />
            <ProfileStack.Screen 
                name = 'Pets' 
                component = {SitterPets}
            />
        </ProfileStack.Navigator>
    )
}

const ScheduleStack = createNativeStackNavigator();

function ScheduleStackScreen()
{
    return(
        <ScheduleStack.Navigator
            screenOptions={headerOptions}
        >
            <ScheduleStack.Screen
                options = {{title: 'Schedule'}}
                name = 'ScheduleScreen' 
                component={Schedule}
            />
            <ScheduleStack.Screen 
                options = {{presentation: 'modal'}}
                name = 'New schedule' 
                component = {NewSchedule}
            />
        </ScheduleStack.Navigator>
    )
}
const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigation()
{
    const { roles } = usePermissions();

    return(
        <BottomTab.Navigator
            initialRouteName={Search}
            backBehavior = {'history'}
            screenOptions={({ route }) => 
            ({
                headerShown: false,
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
                    component={ScheduleStackScreen}
                />
            }
            <BottomTab.Screen
                name = 'Profile' 
                component={ProfileStackScreen}
            />
        </BottomTab.Navigator>
    )
}