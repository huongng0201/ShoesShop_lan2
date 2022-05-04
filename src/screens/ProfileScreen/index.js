import { Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLORS from '../../themes';

export default function ProfileScreen() {
  const [like, setLike]=useState('Unlike')
  const [liked, setLiked]=useState(false)
  // state = {
  //   like: 'Unlike',
  //   liked: false
  // }
    const selectLike = () => {
  //   this.setState(prevstate => {
  //       return {
  //       ...prevstate, 
  //       like: (prevstate.liked ? 'Unlike' : 'like'), liked: !prevstate.liked
  //   }
  // })
  // setLike ('like')
  // setLiked(true)
  }
 useEffect(()=>{

 },[])
    return (
      <View>
        <Text>index</Text> 
        <TouchableOpacity onPress={selectLike()}>
  {liked ?
      <View>
         <AntDesign name='like1' size={30} 
         style={{color:COLORS.orange, marginHorizontal:20}} />
          <Text> {like} </Text>
           </View>
          :
      <View>
          <AntDesign name='like2' size={30} 
          style={{color:COLORS.orange, marginHorizontal:20}} />
          <Text > {like} </Text> 
          </View>
}

  </TouchableOpacity>  
      </View>
    )
  }






