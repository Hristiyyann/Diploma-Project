import React, {useState, useEffect} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {NavigationContainer} from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {getItemValue, saveItem} from './Utils';
import { default as theme } from './theme.json'; 
import SignUp from './screens/SignUp';


export default function App() 
{
  const [isLoggedIn, setIsLoggedIn] = useState();


  useEffect(()=>
  {
    async function test()
    {
      const accessToken = await getItemValue('accessToken');
      const refreshToken = await getItemValue('refreshToken');
      
      if(accessToken == null || refreshToken == null) {setIsLoggedIn(false); return;}
      console.log(accessToken + ' at');
    }  
    
    test();
  },[]);

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <SafeAreaView style={{flex: 1}}>
              <SignUp/>
          </SafeAreaView> 
        </NavigationContainer>
      </SafeAreaProvider>
    </ApplicationProvider>
  );
}