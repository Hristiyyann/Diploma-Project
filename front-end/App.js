import React, {useState, useEffect} from 'react';
import * as eva from '@eva-design/eva';
import { ScrollView } from 'react-native';
import {ApplicationProvider} from '@ui-kitten/components';
import {NavigationContainer} from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { default as theme } from './theme.json'; 

export default function App() 
{
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <ScrollView contentContainerStyle={{flex: 1}}>
            <SafeAreaView style={{flex: 1}}>
            
            </SafeAreaView> 
          </ScrollView>
        </NavigationContainer>
      </SafeAreaProvider>
    </ApplicationProvider>
  );
}