import { View, Text , TouchableOpacity, StyleSheet, FlatList, Image, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { navigate } from '../../navigation/NavigationWithoutProp';
import { stackName } from '../../configs/navigationConstants';
import COLORS from '../../themes';

export default function Category({navigation, route}) {
  const [categoryId, setCategoryId]=useState('')
  const [data, setData]= useState([])
 
  const loadByCategory = async (category) => {
    try {
      const response = await
      // fetch('http://svcy3.myclass.vn/api/Product/getProductByCategory?categoryId=men', {
        fetch(`http://svcy3.myclass.vn/api/Product/getProductByCategory?categoryId=${route.params.category}`, {
          method: 'GET',
        })
      const data = await response.json()
      // console.log(data.content);
      setData(data)
    }
    catch (error) {
      console.log("error");;
    }
  }
  // fix err: Warning: Can't perform a React state update on an unmounted component.
  // function useAsync(asyncFn, onSuccess) {
  //   useEffect(() => {
  //     let isActive = true;
  //     asyncFn().then(data => {
  //       if (isActive) onSuccess(data);
  //     });
  //    loadByCategory()
      
  //   }, [asyncFn, onSuccess]);
  // }
  useEffect (()=>{
    loadByCategory()
  },[])

  const onPressItem =(id)=>{
    navigate(stackName.detailStack, { id: id });
  }
  const renderByCategory = ({item})=>{
      return(
        <View style={styles.container}>
        <View style={styles.imagebg}>
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
  const object = data.content
    // console.log(object);
  const relatedProductByCate = () => {
    return object.map((item, index) => {
      return (
        <View key={index} style={{ marginRight: 15 }} >
          <TouchableOpacity >
            <Image source={{ uri: item.image }} style={{ height: 150, width: 160, }}
            />
          </TouchableOpacity>
          <View style={{ width: 160, }}>
            <Text style={{ fontWeight: 'bold', color: COLORS.grey }}>{item.name}</Text>
            <Text style={{ fontWeight: 'bold', color: COLORS.darkgray }}>$ {item.price}</Text>
            <Text style={{ color: COLORS.grey }}>{item.shortDescription}</Text>
          </View>
        </View>
      )
    })
  }
  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name='close' size={30} style={{marginTop:30, marginHorizontal:20}}/>
        </TouchableOpacity>
        <Text>category:</Text>
        <View style={{flex: 6}}>
      <FlatList 
      data={object}
      renderItem={renderByCategory}
      keyExtractor={item => item.id}
      numColumns={2}
      />
      </View>
      <View style={{flex: 4}}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.grey }}>Related Products:</Text>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
          {object && relatedProductByCate()}
        </ScrollView>
      </View>
      <View style={{flex: 1}}></View>
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
  price: { fontSize: 20, color: COLORS.darkgray, fontWeight: 'bold' },
  imagebg: { backgroundColor: COLORS.superlightteal, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginTop: 25, height: 160 },
  image: { backgroundColor: COLORS.gray, 
    borderRadius: 20, 
    marginLeft:3,
    alignItems: 'center', 
    marginTop: 10,
     height: 150,
    width:'99%' },

})