import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {Background} from '../../assets'

export default function BackgroundView() {
  return (
      <ImageBackground source={Background} style={{flex:1}} >
    
  </ImageBackground>
  )
}