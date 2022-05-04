import { Text, View, StyleSheet, Alert } from 'react-native'
import React, { Component } from 'react'
import LoginUI from './src/LoginUI';
import RegisterUI from './src/LoginUI/RegisterUI'
import LoginScreen from './src/LoginUI';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigation/rootNavigation';
import {navigationRef} from './src/navigation/NavigationWithoutProp'
import store from './src/redux/rootStore';
import { Provider } from 'react-redux';

const App = () => {
  // const [showLogin, setShowLogin]= useState(true)
  return (

    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <RootNavigation />

      </NavigationContainer>
    </Provider>


    // <View style={styles.container}>
    //   <LoginUI />
    //   </View>


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