import React, {useContext} from 'react';
import { usePermissions } from '../contexts/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUp, SignIn, ForgetPassword, PasswordRecovery, ResetPassword, Verification, Home } from '../screens/index';

const Stack = createNativeStackNavigator();

export default function StackNavigation() 
{
    const {isLoggedIn} = usePermissions();
    
    return(
        <Stack.Navigator
            screenOptions=
            {{
                headerStyle: 
                {
                    backgroundColor: '#D9D9D9',
                },
                headerTintColor: '#73423f',
                headerTitleStyle:
                {
                    fontWeight: 'bold',
                },
            }}>
            {isLoggedIn ?
            (
                <>
                    <Stack.Screen 
                        name = 'Home' 
                        component = {Home}
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