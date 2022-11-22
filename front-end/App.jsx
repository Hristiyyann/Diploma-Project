import React, {useState, useEffect} from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { default as theme } from './theme.json'; 
import StackNavigation from './navigation/StackNavigation';
import { LoadingContextProvider, PermissionsContextProvider } from './contexts/index';


export default function App() 
{
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <PermissionsContextProvider>
         <LoadingContextProvider>
          <SafeAreaProvider>
            <NavigationContainer> 
              <StackNavigation/>
            </NavigationContainer>
          </SafeAreaProvider>
        </LoadingContextProvider>  
      </PermissionsContextProvider>  
    </ApplicationProvider>
  );
}