import { Text, View, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLORS from '../../themes';

export default class Like extends Component {
  state = {
    like: 'Unlike',
    liked: false
  }
    selectLike = () => {
    this.setState(prevstate => {
        return {
        ...prevstate, 
        like: (prevstate.liked ? 'Unlike' : 'Like'), liked: !prevstate.liked
    }
  })
  }
  render() {
    return (
      <View style={{ justifyContent:'center', alignItems:'center', position:'relative', left:100,}}>
       
        <TouchableOpacity onPress={this.selectLike}>
  {this.state.liked ?
      <View>
         <AntDesign name='like1' size={35} style={{color:COLORS.teal}} />
          <Text style={{fontSize:15}} > {this.state.like} </Text>
           </View>
            :
      <View>
          <AntDesign name='like2' size={35} style={{color:COLORS.teal}} />
          <Text style={{fontSize:15}} > {this.state.like} </Text> 
          </View>
  }

  </TouchableOpacity>  
      </View>
    )
  }
}





