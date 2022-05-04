import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, {useState} from 'react'
import { View,Text } from "react-native";
import { stackName } from "../configs/navigationConstants";
import HomeTab from "./Tab/HomeTab";
import Screen from "../screens";
import { createNavigationContainerRef } from "@react-navigation/native";
import LoginUI from "../LoginUI/Login";
import RegisterUI from "../LoginUI/RegisterUI";



const Stack = createNativeStackNavigator()



export default function RootNavigation () {
  const [isSignIn, setIsSigIn]=useState(false)
 
    return (
      isSignIn? (
        
    <Stack.Navigator screenOptions ={{headerShown:false}} initialRouteName="LoginUI">
      <Stack.Screen name={stackName.loginStack} component= {LoginUI} /> 
      <Stack.Screen name={stackName.signupStack} component= {RegisterUI} /> 
      </Stack.Navigator>
      )
      :
      (
        <Stack.Navigator>
<Stack.Screen name={stackName.homeStack} component= {HomeTab} />
<Stack.Screen name={stackName.detailStack} component= {Screen.DetailScreen} />
<Stack.Screen name={stackName.cartOrderStack} component= {Screen.CartOrder} />
    </Stack.Navigator>
    
    )    
  
    )
  
}