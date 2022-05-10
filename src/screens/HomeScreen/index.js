import { Text, View , StatusBar, FlatList, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect,  } from 'react'
import COLORS from '../../themes';
import {BackgroundView} from '../../components';
import {ShoeItem} from './components/ShoeItem' ;
import axios from 'axios';
import { loadOptions } from '@babel/core';
import AntDesign from 'react-native-vector-icons/AntDesign'
import DetailScreen from '../DetailScreen';
import {navigate} from '../../navigation/NavigationWithoutProp';
import {stackName} from '../../configs/navigationConstants';


const HomeScreen=() => {
  const [data, setData] = useState([])
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [dataCategories, setDataCategories] = useState([])
  // const [loading, setLoading]=useState(false)

  const load = async()=>{
      try{ 
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
      const loadCategories = async()=>{
        try{
          const response = await 
            fetch('http://svcy3.myclass.vn/api/Product/getAllCategory', {
              method: 'GET',
          }) 
          const dataCategories = await response.json()
          setDataCategories(dataCategories) 
        }
        catch (error) {
          console.log("error");;
        } 
        }
      const newData = data.content

     const onPressItem = (id)=>{
        navigate(stackName.detailStack, {id: id});
     
      }

   renderItem =({item})=>{
     return(
       <View style={styles.container}>

       <View style={styles.image}>
       <AntDesign name='hearto' size={20} style={{ marginLeft:100,marginTop:25}}/>
       <TouchableOpacity onPress={()=>onPressItem(item.id)}>
    <Image source={{uri: item.image}} style={{height: 150, width: 150, justifyContent:'center'}} 
   />
    </TouchableOpacity>
       </View >

       <View style={{height: 50, marginTop:10 }}>
         <Text style={{fontSize:19}}>{item.name}</Text>
       </View>
       <View style={{ }}> 
       <Text style={styles.price}>$ {item.price}</Text>
      
       </View>

       </View>
     )
   }
   const arrCategories = dataCategories.content
   const renderScrollView=()=>{
    //  return arrCategories.map((item, index)=>{      
    //    return(
    //      <View style={[styles.container, {height:100}]}>
    //   <Text style={{fontWeight:'bold', fontSize:20}}>{item.category}</Text>
    //   </View>
    //    )
    //  })
    
   }

  useEffect(() => {
   load(),
   loadCategories()
  }, []);

    return(
     
   
  <View style={styles.container}>   
  <ScrollView horizontal={true} 
  contentContainerStyle={{alignItems:'center', justifyContent:'center'}}>
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
    marginTop: StatusBar.currentHeight || 50,
   marginLeft:12,
   marginRight:12
  },
 price:{fontSize:20, color: COLORS.darkgray, fontWeight:'bold'},
 image:{ backgroundColor: 'pink', borderRadius: 30,  justifyContent:'center', alignItems:'center', marginTop:25, height:160}
});
export default HomeScreen;