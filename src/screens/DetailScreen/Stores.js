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
    console.log(storesData);
    const viewStores = () => {
        return (
            <View>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{ height: 400, width: '100%' }}
                    region={{
                        latitude: 10.762622,
                        longitude: 106.660172,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.05,
                    }}
                >
                    {storesData && storesData.map((m,index) => {
                        <Marker
                            key={index}
                            coordinate={{latitude: m.latitude, longitude: m.longtitude }}
                            title={m.name}
                        />
                    })
                    }
                </MapView>
            </View>
        )

    }
    return (
        <View>
            <Text>Stores</Text>

            {viewStores()}
        </View>
    )

}