import { View, Text, TouchableOpacity, StyleSheet , FlatList, Image} from 'react-native'
import React, {useEffect, useState} from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { navigate } from '../../navigation/NavigationWithoutProp';
import { stackName } from '../../configs/navigationConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../../themes';

export default function LikeHook({navigation}) {
const [data, setData]= useState([])
const [cart, setCart] = useState([])
const [tempLike, setTempLike] = useState([])
  useEffect(() => {
    loadCart(tempLike)
    loadByProduct()
  }, [tempLike])
  const loadCart = async () => {
    var cart = await AsyncStorage.getItem("like");
    cart = JSON.parse(cart) 
    setCart(cart)

  }
const loadByProduct = async () => {
  try {
    const response = await
      fetch('http://svcy3.myclass.vn/api/Product', {
        method: 'GET',
      })
    const data = await response.json()
    setData(data)
  }
  catch (error) {
    console.log("error");
  }
}
const deleteItem = async (productId) => {
  cart.splice(productId, 1);
  await AsyncStorage.setItem("like", JSON.stringify(cart));
  setTempLike(cart);
  // console.log(cart);
}
const obj = data.content
renderItem = ({ item }) => {
  return obj.map((i, index) => {
    return (
      <View key={index}>
        {item.productId === i.id &&
          (<View>
            <View style={{ flexDirection: 'row', marginHorizontal:10, justifyContent:'space-between' }}>

              
              <Image source={{ uri: i.image }} style={{ height: 110, width: 130, marginTop: 20 }} />
              <View style={{ justifyContent: 'center', width: 160, }} >
                {/* <TouchableOpacity onPress ={(productId)=> navigate(stackName.detailStack, {productId: i.id})}> */}
                <TouchableOpacity >
                  <Text style={{ fontSize: 15, fontWeight: 'bold', }}>{i.name}</Text>
                  <Text style={{ fontSize: 15, color: COLORS.darkgray }}>{i.description}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30, borderBottomColor: COLORS.grey, borderBottomWidth: 1, marginBottom: 10, paddingBottom: 10 }}>
            
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>$ {i.price}</Text>
              <View style={{ flexDirection: 'row', position: 'relative', bottom: 5,  right: 20, right:30 }}>
              <AntDesign name='dislike1' size={30} style={{color:COLORS.gray1}}
                  onPress={() => deleteItem()}
                />
              
              </View>
            </View>
          </View>)}
      </View>
    )
  })
}
const listItem = () => {
  return (
    <View>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={item => item.productId}
      />
    </View>
  )
}
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate(stackName.homeStack, "HomeScreen")}>
          <AntDesign name='close' size={30} style={{marginTop:30, marginHorizontal:20}}/>
        </TouchableOpacity>
     {obj&&listItem()}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 40,
    marginTop: 20,
    marginLeft: 12,
    marginRight: 12
  },
})