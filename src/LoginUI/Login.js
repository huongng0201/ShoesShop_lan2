import { Text, View, StyleSheet, TextInput as RNTextInput, TouchableOpacity, Button, Alert } from 'react-native'
import React, { useState} from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import TextInput from './components/TextInput';
import { LoginButton, AccessToken } from 'react-native-fbsdk-next';
import { navigate } from '../navigation/NavigationWithoutProp';
import HomeScreen from '../screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {stackName} from '../configs/navigationConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginUI ({navigation, setIsSignIn}) {

    const hanldePressEmail =(email)=>{
        setEmail(email)
        setErr(null)
    }
    const hanldePressPassword=(password)=>{
        setPassword(password)
        setErr(null)
    }


    const [email, setEmail] =useState('')
    const [id, setId]=useState('')
    const [password, setPassword] =useState('')
    const [err, setErr] =useState(null)


    const login = () =>{
      fetch('http://svcy3.myclass.vn/api/Users/signin', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:email, password: password })
        })
        .then((response) => response.json())
        .then(async (data) => {
          if (data.statusCode === 200) {
            await AsyncStorage.setItem("accessToken", data.content.accessToken);
            setIsSignIn(false);
            navigation.navigate(stackName.homeStack, "HomeScreen");
          } else {
            setErr(data.message);
            Alert.alert("Email or Password is wrong. Please try again.");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };
           
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <AntIcon name='lock' size={80} style={{ color: '#26c6da' }} />
                    <Text style={styles.textHeader}> Welcome to AP!</Text>
                </View>

                <View style={styles.loginForm}>
                    <TextInput 
                    title='Email' 
                    placeholder='mail@example.com' 
                    value={email} 
                    onChangeText ={hanldePressEmail} 
                    autoCapitalize = "none"/>
                    <TextInput 
                    title="Password" 
                    placeholder='********' 
                    secureTextEntry password 
                    value={password} 
                    onChangeText={hanldePressPassword}
                    autoCapitalize = "none"/>
                </View>

                <TouchableOpacity style={styles.btnLogin} onPress={()=>login()}>
                    <Text style={styles.btnLoginText}> Log In</Text>
                </TouchableOpacity>

                <View style={{justifyContent:'center', alignItems:'center', marginVertical:10, backgroundColor:'red' }}>
                <LoginButton 
          onLoginFinished={(error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then((data) => {
                    console.log(data.accessToken.toString())
                  })
              }
            }}
          onLogoutFinished={() => console.log("logout.")}/>
</View>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#006978', fontSize: 20, alignSelf: 'center' }}> Forgot Password?</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.textFooter}> Don't you have an account?</Text>
                    <TouchableOpacity style={styles.textFooter}>
                        <Text style={styles.register} onPress={()=>navigate(stackName.signupStack)}>Register</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
           justifyContent:'center',
           alignItems:'center'
    },
    header: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60
    },
    textHeader: {
        fontSize: 25,
        paddingTop: 20,
        color: '#006978',
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    loginForm: {
        flex: 2,
        // backgroundColor: 'red', 
        // alignContent:'space-between',
        // justifyContent:'center',
    


    },
    btnLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        backgroundColor: '#006064',
        height: 50,
        width:'90%',
        margin: 10,
        borderRadius: 8,

    },

    btnLoginText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20
    },
    footer: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 60

    },
    register: {
        color: '#006978',
        fontSize: 20,
        marginLeft: 5
    },
    textFooter: {
        color: '#aeaeae',
        fontSize: 18,
        alignSelf: 'center',
        paddingTop: 80
    },
    password: {
        flexDirection: 'row',

    }
})