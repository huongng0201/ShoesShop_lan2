import { Text, View, StatusBar, FlatList, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, } from 'react'
import COLORS from '../../themes';
import { navigate, navigationRef } from '../../navigation/NavigationWithoutProp';
import { stackName } from '../../configs/navigationConstants';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';


const HomeScreen = ({ navigation, setIsSignIn }) => {
  // console.log(setIsSignIn);
  const [data, setData] = useState([])
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [dataCategories, setDataCategories] = useState([])
 const [byCategory, setByCateGory] =useState([])

  const load = async () => {
    try {
      const response = await
        fetch('http://svcy3.myclass.vn/api/Product', {
          method: 'GET',
        })
      const data = await response.json()
      setData(data)
    }
    catch (error) {
      console.log("error");;
    }
  }
  const loadCategories = async () => {
    try {
      const response = await
        fetch('http://svcy3.myclass.vn/api/Product/getAllCategory', {
          method: 'GET',
        })
      const dataCategories = await response.json()
      setDataCategories(dataCategories.content)
    }
    catch (error) {
      console.log("error");;
    }
  }

  const newData = data.content

  const onPressItem = (id) => {
    navigate(stackName.detailStack, { id: id });
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.container}>

        <View style={styles.imagebg}>
          {/* <AntDesign name='hearto' size={20} style={{ marginLeft: 100, marginTop: 25 }} /> */}
          <View style={styles.image}>
          <TouchableOpacity onPress={() => onPressItem(item.id)}>
            <Image source={{ uri: item.image }} style={{ height: 150, width: 150, justifyContent: 'center' }}
            />
          </TouchableOpacity>
          </View>
        </View >

        <View style={{ height: 50, marginTop: 10 }}>
          <Text style={{ fontSize: 19 }}>{item.name}</Text>
        </View>
        <View style={{}}>
          <Text style={styles.price}>$ {item.price}</Text>

        </View>

      </View>
    )
  }
  const onPressByCategory = (category) => {
    // console.log(category);
    navigate(stackName.categoryStack, { category: category });
  }
  const renderScrollView = () => {
    return dataCategories.map((item, index) => {
      return (
        <View key={index} style={[styles.container, { height: 50 }]}>
          <TouchableOpacity onPress={()=>onPressByCategory(item.category)}>
            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>{item.category}</Text>
          </TouchableOpacity>
        </View>
      )
    })

  }

  useEffect(() => {
    load(),
      loadCategories()
  }, []);

  const handleLogout = async () => {
    try{
     await AsyncStorage.clear();
      setIsSignIn(true);
      navigation.navigate(stackName.loginStack, "LoginStack");
    }
    catch(e){
      console.log(e);
    }
  };

  return (
    <View style={[styles.container, { height: 100 }]}>
      <TouchableOpacity onPress={() => handleLogout()}>
        <SimpleLineIcons name='logout' size={30} style={{ position: 'relative', top: 5, left: 310, color: COLORS.darkteal, marginTop:20 }} />
      </TouchableOpacity>
      <ScrollView horizontal={true}
        contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', }}>
        {dataCategories && renderScrollView()}
      </ScrollView>
      <FlatList
        data={newData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
      // ItemSeparatorComponent={() => <View style={{height: 60}} />}
      // contentContainerStyle={{paddingBottom: 60, justifyContent:'center', marginRight:10}}
      // showsVerticalScrollIndicator={false}

      />

    </View>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 40,
    marginTop: 50,
    marginLeft: 12,
    marginRight: 12
  },
  price: { fontSize: 20, color: COLORS.darkgray, fontWeight: 'bold' },
  imagebg: { backgroundColor: COLORS.superlightteal, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginTop: 25, height: 160 },
  image: { backgroundColor: COLORS.gray, 
    borderRadius: 20, 
    marginLeft:3,
    alignItems: 'center', 
    marginTop: 10,
     height: 150,
    width:'99%' },

});
export default HomeScreen;