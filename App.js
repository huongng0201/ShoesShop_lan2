import { Text, View, StyleSheet, Alert } from 'react-native'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigation/rootNavigation';
import {navigationRef} from './src/navigation/NavigationWithoutProp'
import store from './src/redux/rootStore';
import { Provider } from 'react-redux';

const App = () => {
  return (

    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <RootNavigation />

      </NavigationContainer>
    </Provider>
  )
}
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
     justifyContent:'center',
    alignItems: 'center'
  },
})