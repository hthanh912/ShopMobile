import React, { Component } from 'react'
import { Settings } from 'react-native-fbsdk-next';
import { Provider } from 'react-redux';
import store from './src/redux/store'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/root-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/navigation/root-navigation';
import { API_URL, FB_APP_ID } from '@env';
import { Platform, StatusBar } from 'react-native';
import  changeNavigationBarColor  from 'react-native-navigation-bar-color';


// Ask for consent first if necessary
// Possibly only do this for iOS if no need to handle a GDPR-type flow
Settings.setAppID(FB_APP_ID);
Settings.initializeSDK();

const App = () => {

  console.log(API_URL);

  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);
    changeNavigationBarColor('#ffffff');
    //example();
  }


  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}

export default App;