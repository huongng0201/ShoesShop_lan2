
import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Screen from '../../screens'
import { tabName } from '../../configs/navigationConstants';
import COLORS from '../../themes';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { View, StyleSheet } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';


const BottomTab = createBottomTabNavigator();
const tabBarIcon = ({route: {name}, size, focused}) =>{
 const icons ={
   HomeTab:'home',
   CartOrderTab: 'shopping-bag',
   ProfileTab: 'user'
 }
 const backgroundColor = focused? COLORS.darkgray: 'transparent'
 return (
   <View style={[styles.tabBarIcon, {backgroundColor}]}>
 <EntypoIcon name={icons[name]} color={COLORS.white} size={size} />
 </View>
 )
 
};

const screenOptions =({route})=>({
  headerShown: false, 
  tabBarShownLabel: false, 
  tabBarStyle:{backgroundColor:COLORS.teal},

  tabBarIcon: params => tabBarIcon({...params, route}),
})


function HomeTab ({setIsSignIn}) {
console.log(setIsSignIn);
const HomeScreen = Screen.HomeScreen;
    return (
    
    <BottomTab.Navigator screenOptions={screenOptions}>
        <BottomTab.Screen name={tabName.homeTab}  >
          {(props)=> <HomeScreen {...props} setIsSignIn={setIsSignIn} />}
          </BottomTab.Screen>
        <BottomTab.Screen name={tabName.cartOrderTab} component={Screen.CartOrder} />
        <BottomTab.Screen name={tabName.profileTab} component={Screen.ProfileScreen} />
     
    </BottomTab.Navigator>
    )
  }


export default HomeTab;

const styles = StyleSheet.create({
  tabBarIcon: { width:'40%', height: '100%', marginTop:10, justifyContent:'center', alignItems:'center', borderRadius:10, }
})