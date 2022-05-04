
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
 const backgroundColor = focused? COLORS.darkteal: 'transparent'
 return (
   <View style={[styles.tabBarIcon, {backgroundColor}]}>
 <EntypoIcon name={icons[name]} color={COLORS.orange} size={size} />
 </View>
 )
 
};

const screenOptions =({route})=>({
  headerShown: false, 
  tabBarShownLabel: false, 
  tabBarStyle:{backgroundColor:COLORS.teal},

  tabBarIcon: params => tabBarIcon({...params, route}),
})


export class HomeTab extends Component {
  render() {
    return (
    
    <BottomTab.Navigator screenOptions={screenOptions}>
        <BottomTab.Screen name={tabName.homeTab} component={Screen.HomeScreen} />
        <BottomTab.Screen name={tabName.cartOrderTab} component={Screen.CartOrder} />
        <BottomTab.Screen name={tabName.profileTab} component={Screen.ProfileScreen} />
     
    </BottomTab.Navigator>
    )
  }
}

export default HomeTab;

const styles = StyleSheet.create({
  tabBarIcon: { width:'40%', height: '100%', marginTop:10, justifyContent:'center', alignItems:'center', borderRadius:10}
})