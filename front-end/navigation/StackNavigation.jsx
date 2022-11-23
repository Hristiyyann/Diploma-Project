import React, {useContext} from 'react';
import { usePermissions } from '../contexts/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUp, SignIn, ForgetPassword, PasswordRecovery, ResetPassword, Verification } from '../screens/index';
import BottomTabNavigation  from './BottomNavigation';

const Stack = createNativeStackNavigator();

export default function Navigator() 
{
    const {isLoggedIn} = usePermissions();
    
    return(
        <Stack.Navigator
            screenOptions=
            {{
                headerStyle: 
                {
                    backgroundColor: '#73423f',
                },
                headerTintColor: '#ec6165',
                headerTitleStyle:
                {
                    fontWeight: 'bold',
                },
            }}>
            {isLoggedIn ?
            (
                <>
                    <Stack.Screen 
                        options={{ headerShown: false }}
                        name = 'Root' 
                        component = {BottomTabNavigation}
                    />
                </>
            ) 
            :
            (
                <>
                    <Stack.Screen 
                        options = {{headerShown: false}}
                        name = 'Sign Up' 
                        component = {SignUp}
                    />
                    <Stack.Screen 
                        options = {{headerShown: false}}
                        name = 'Sign In' 
                        component = {SignIn}
                    />
                    <Stack.Screen 
                        name = 'Forget password' 
                        component = {ForgetPassword}
                    />
                    <Stack.Screen 
                        name = 'Password recovery' 
                        component = {PasswordRecovery}
                    />
                    <Stack.Screen 
                        name = 'Reset password' 
                        component = {ResetPassword}
                    />
                    <Stack.Screen 
                        name = 'Verification' 
                        component = {Verification}
                    />
                </>
            )}
        </Stack.Navigator>
    )
}