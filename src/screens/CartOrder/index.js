import { View, Text, TouchableOpacity, FlatList, Image, SafeAreaView, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import COLORS from '../../themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../../navigation/NavigationWithoutProp';
import { stackName } from '../../configs/navigationConstants';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { template } from '@babel/core';

export default function CartOrder({ navigation, route, props }) {

  const [cart, setCart] = useState([])
  const [id, setId] = useState('')
  const [data, setData] = useState([])
  const [temp, setTemp] = useState([])
  const [quantity, setQuantity]= useState('')
  const [productId, setProductId] = useState('')
  const [quantities, setQuantities] = useState([])
  const [orderDetail, setOrderDetail] = useState([])
  const [email, setEmail]= useState('')



  useEffect(() => {
    loadCart(temp)
    loadOneProduct()
  }, [temp])
  const loadCart = async ({item}) => {
    var cart = await AsyncStorage.getItem("orderDetail");
    cart = JSON.parse(cart) 
    setCart(cart)

  }
  
  const deleteItem = async (productId) => {
    cart.splice(productId, 1);
    await AsyncStorage.setItem("orderDetail", JSON.stringify(cart));
    setTemp(cart);
    // console.log(cart);
  }

  const loadOneProduct = async (id) => {
    try {
      const response = await
        fetch('http://svcy3.myclass.vn/api/Product', {
          method: 'GET',
        })
      const data = await response.json()
      // console.log(data);
      setData(data)
    }
    catch (error) {
      console.log("error");
    }
  }


  const saveCart = async (productId) => {
    var oldData = await AsyncStorage.getItem("orderDetail");
    oldData = JSON.parse(oldData);
    // console.log(oldData);
    let checking = true
    if (oldData != null) {
      oldData = oldData.map((item) => {
        if (item.productId == productId) {
          checking = false;
          return {
            productId,
            quantity: quantities[productId],
          };
        }
        return item;
      });

      if (checking) {
        await AsyncStorage.setItem(
          "orderDetail",
          JSON.stringify([...oldData, { productId, quantity }])
        );
      } else {
        await AsyncStorage.setItem("orderDetail", JSON.stringify([...oldData]));
      }

    } else {
      await AsyncStorage.setItem(
        "orderDetail",
        JSON.stringify([{ productId, quantity }])
      );
    }
  //   // AsyncStorage.clear()
  //   // var temp = await AsyncStorage.getItem("orderDetail");
  //   // console.log("=============Start=================");
  //   // console.log(temp);
  //   // console.log("=============End===================");
   }

  const handleQty = (key, value) => {
    const temp = quantities;
    temp[key] = value;
    setQuantities(temp);
  }

  const obj = data.content
  // console.log(obj);
  renderItem = ({ item }) => {
    return obj.map((i, index) => {
      return (
        <View key={index}>
          {item.productId === i.id &&
            (<View>
              <View style={{ flexDirection: 'row', marginHorizontal:10, justifyContent:'space-between' }}>

                <View style={{ flexDirection: 'row', position: 'relative', top: 5, left: 20, right:30 }}>
                  <AntDesign name='close' size={20}
                    onPress={() => deleteItem()}
                  />
                  <TouchableOpacity onPress={() => saveCart(item.productId)}>
                    <AntDesign name='save' size={20} style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.darkteal, marginLeft: 10 }} />
                  </TouchableOpacity>
                </View>
                <Image source={{ uri: i.image }} style={{ height: 110, width: 130, marginTop: 20 }} />
                <View style={{ justifyContent: 'center', width: 160, }} >
                  {/* <TouchableOpacity onPress ={(productId)=> navigate(stackName.detailStack, {productId: i.id})}> */}
                  <TouchableOpacity>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', }}>{i.name}</Text>
                    <Text style={{ fontSize: 15, color: COLORS.darkgray }}>{i.description}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 30, borderBottomColor: COLORS.grey, borderBottomWidth: 1, marginBottom: 10, paddingBottom: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ marginLeft: 5, fontSize: 18, fontWeight: 'bold', }}>Qty: </Text>
                  <TouchableOpacity>
                    <TextInput
                      placeholder='0'
                      defaultValue={quantity}
                      onChangeText={(value) => handleQty(item.productId, value)}
                      style={{ marginLeft: 5, fontSize: 18, fontWeight: 'bold', marginRight: 50, width:30 }}
                    >
                      {item.quantity}</TextInput>
                  </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>$ {i.price}</Text>
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

  const sumTotal = (productId) => {
   
  }

  const checkOut = async()=>{
    const accessToken = await AsyncStorage.getItem("accessToken");
    let account = await AsyncStorage.getItem("account");
    account = JSON.parse(account);
    let email = account.email
    console.log(email);
    var cart = await AsyncStorage.getItem("orderDetail");
    cart = JSON.parse(cart) 
    console.log(cart);
    if(email=!null){
    cart= cart.map((i)=>{
      const res = fetch('http://svcy3.myclass.vn/api/Users/order', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              // "Authorization": "Bearer " + accessToken
            },
            body: JSON.stringify({productId: i.productId, quantity: i.productId}, email)
          })
     .then((res)=>console.log(res))
     .then(()=> loadCart(temp))
     Alert.alert("Your order is successful") 
     AsyncStorage.clear("orderDetail")
    }
    )
  }
    else{
      console.log("err");
  }
}

  return (
    <View style={{ flex: 1, marginVertical: 20 }}>
      <View style={{ flex: 1, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 20 }}>Bag</Text>
        <TouchableOpacity onPress={() => navigate(stackName.homeStack, "HomeScreen")}>
          <Text style={{ fontSize: 20, marginRight: 30 }}>Close</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 5, }}>
        {obj && listItem()}
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, marginLeft: 30, fontWeight: 'bold' }}>Total: {sumTotal()}</Text>


      </View>
      <View style={{ flex: 1, justifyContent:'center', alignItems:'center', marginHorizontal: 20, marginVertical:15 }}>

        <TouchableOpacity onPress={()=>checkOut()}
        style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.darkteal, width: 350, height: 60, borderRadius: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.white, }}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}