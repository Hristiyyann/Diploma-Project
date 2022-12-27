import React, {useState, useEffect} from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LoadingModal, ServerErrorModal } from './components/index';
import { default as theme } from './theme.json'; 
import Navigator from './navigation/StackNavigation';
import { LoadingContextProvider, PermissionsContextProvider, ShowErrorProvider } from './contexts/index';

export default function App() 
{
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <LoadingContextProvider>
        <ShowErrorProvider>
          <PermissionsContextProvider>
            <SafeAreaProvider>
              <NavigationContainer> 
                <Navigator/>
                <LoadingModal/>
                <ServerErrorModal/> 
              </NavigationContainer>
            </SafeAreaProvider>
          </PermissionsContextProvider> 
        </ShowErrorProvider> 
      </LoadingContextProvider>  
    </ApplicationProvider>
  );
}