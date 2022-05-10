import { View, Text } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLORS from '../../themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function LikeHook() {
    const[like, setLike]=useState(false)
    const[dislike, setDislike]=useState(true)
    const [color, setColor]=useState(COLORS.gray)

  
    const changeLike =async()=>{
        setColor(COLORS.teal)
        var likeItem = await AsyncStorage.getItem("like");
        likeItem = JSON.parse(likeItem);
        console.log(likeItem);
        // let checking = true;
        // if (oldData != null) {
        //   oldData = oldData.map((item) => {
        //     if (item.productId == productId) {
        //       checking = false;
        //       return {
        //         productId,
        //         quantity,
        //       };
        //     }
        //     return item;
        //   });
        // }        
    }
   
  return (
   
     <View style={{marginRight:20}}>
         <AntDesign name='like1' size={35} style={{color}} onPress={()=>changeLike()} />
          <Text style={{fontSize:15}} > Like </Text>
           </View>
        
 
  )
}