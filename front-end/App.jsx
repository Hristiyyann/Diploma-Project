import React, {useState, useEffect} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {NavigationContainer} from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {getItemValue, saveItem} from './Utils';
import { default as theme } from './theme.json'; 
import StackNavigation from './navigation/StackNavigation';
import {PermissionsContextProvider } from './contexts/PermissionContext';

export default function App() 
{
  const [isLoggedIn, setIsLoggedIn] = useState();

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <PermissionsContextProvider>
        <SafeAreaProvider>
          <NavigationContainer> 
              <StackNavigation/>
          </NavigationContainer>
        </SafeAreaProvider>
      </PermissionsContextProvider>  
    </ApplicationProvider>
  );
}