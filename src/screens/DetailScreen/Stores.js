import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image, TextInput, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { navigate } from '../../navigation/NavigationWithoutProp';
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLORS from '../../themes';
import { stackName } from '../../configs/navigationConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Like from './Like';
import LikeHook from './LikeHook';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

export default function Stores() {
    const [store, setStore] = useState([])
    const stores = async () => {
        try {
            const response = await
                fetch("http://svcy3.myclass.vn/api/Product/getAllStore", {
                    method: 'GET',
                })
            const store = await response.json()
            // console.log(store); 
            setStore(store)
        }
        catch (error) {
            console.log("error");
        }
    }
    useEffect(() => {
        stores()
    }, [])
    const storesData = store.content
    // console.log(storesData);
    const storeAdd = () => {
        return storesData.map((s, index) => {
            return (
                <View key={index} style={{ marginVertical: 10 }}>
                    <Text>{s.name}: {s.description}</Text>
                    <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{ height: 300, width: '90%', marginTop:10 }}
                    region={{
                        latitude: 10.762622,
                        longitude: 106.660172,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.05,
                    }}
                >
                        <Marker
                            // key={index}
                            coordinate={{latitude: Number(s.latitude), longitude: Number(s.longtitude) }}
                            title={s.alias}
                        />
                   
                    
                </MapView>
                </View>
            )
        })
    }
    const viewStores = () => {
        return (
            <View>
                
            </View>
        )

    }
    return (
        <View>
            <Text style={{ fontWeight: 'bold', fontSize:20, color: COLORS.grey }}>Stores:</Text>
            {storesData && storeAdd()}
            {viewStores()}
        </View>
    )

}