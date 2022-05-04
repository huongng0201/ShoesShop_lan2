import { View, Text , TouchableOpacity, FlatList, Image, SafeAreaView } from 'react-native'
import React, {useState, useEffect} from 'react'
import COLORS from '../themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../../navigation/NavigationWithoutProp';


export default function CartOrder({navigation, route}) {
const [dataBag, setDataBag] =useState({})

const importData = async (id) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    const obj = Object.fromEntries(result);
    // obj be like {"key1": "value 1", "key2": "value 2", .....}
    // Now parse the 
    Object.keys(obj).forEach(key => {
      obj[key] = JSON.parse(obj[key]);
    });
    const nObj = obj.orderDetail
    console.log(nObj);
   setDataBag(nObj)
  } catch (error) {
    console.error(error)
  }
}
  useEffect(() => {
    // getData()
    importData()
  }, [])



  const renderItem =()=>{
 
      return(
        <View>
          <TouchableOpacity onPress={()=>onPressItem()}>
    {/* <Image source={{uri: item.image}} style={{height: 150, width: 150, justifyContent:'center'}} 
   /> */}
    </TouchableOpacity>
    <Text style={{fontSize:19}}>{importData.id}</Text>
        </View>
      )

  }

  return (
    <SafeAreaView>
      <Text style={{fontSize:30, fontWeight:'bold', marginLeft:20}}>Bag</Text>
   {renderItem()}
  
      <TouchableOpacity  style={{justifyContent:'center', alignItems:'center', backgroundColor: COLORS.darkteal, marginHorizontal: 30, height: 60, borderRadius:20}}>
      <Text  style={{fontSize:20, fontWeight:'bold',color: COLORS.white }}>Checkout</Text>
      </TouchableOpacity>
      </SafeAreaView>
  )
}