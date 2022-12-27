import React from 'react';
import { usePermissions } from '../contexts/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 
{ 
    SignUp, SignIn, ForgetPassword, PasswordRecovery, ChangePassword, 
    Verification, Successful, BeSitter, SitterServices, SitterPets,
} from '../screens/index';
import BottomTabNavigation  from './BottomNavigation';

const Stack = createNativeStackNavigator();

export default function Navigator() 
{
    const { isLoggedIn } = usePermissions();
    
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
                    <Stack.Screen 
                        name = 'Change password' 
                        component = {ChangePassword}
                    />
                    <Stack.Screen 
                        name = 'Be sitter' 
                        component = {BeSitter}
                    />
                    <Stack.Screen 
                        name = 'Services' 
                        component = {SitterServices}
                    />
                    <Stack.Screen 
                        name = 'Pets' 
                        component = {SitterPets}
                    />
                </>
            ) 
            :
            (
                <>
                    <Stack.Screen 
                        options = {{headerShown: false}}
                        name = 'Sign In' 
                        component = {SignIn}
                    />
                    <Stack.Screen 
                        options = {{headerShown: false}}
                        name = 'Sign Up' 
                        component = {SignUp}
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
                        name = 'Change password' 
                        component = {ChangePassword}
                    />
                    <Stack.Screen 
                        name = 'Verification' 
                        component = {Verification}
                    />
                </>
            )}
            <Stack.Screen navigationKey={isLoggedIn ? 'logged' : 'notLogged'} name="Successful" component={Successful} />
        </Stack.Navigator>
    )
}