import { Text, View, StyleSheet, TextInput as RNTextInput, TouchableOpacity, Button, ImageBackground, Alert } from 'react-native'
import React, { Component } from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import TextInput from './components/TextInput';
import axios from 'axios';
import { checkRequired, emailValidation, nameValidation, phoneValidation, rangeValidation } from './ulties/validator';
import { navigate } from '../navigation/NavigationWithoutProp';
import { stackName } from '../configs/navigationConstants';

export default class RegisterUI extends Component {
    state = {
        value: {
            email: '',
            password: '',
            name: '',
            phone: ''
        },
        error: { emailError: '', passwordError: '', name: '', phone: '' }
    }
    onChangeText = (value, key) => {

        this.setState({
            value: { ...this.state.value, [key]: value },
            error: { ...this.state.error, [key]: '' },
        });
        this.validateData(value, key)
    }
    validateData = (value, key) => {
        switch (key) {
            case 'email':
                this.setState({
                    error: { ...this.state.error, [key]: emailValidation(value) }
                });
                break;
            case 'password':
                this.setState({
                    error: { ...this.state.error, [key]: rangeValidation({ value, input: key, max: 8, min: 4 }) }
                });
                break;
            case 'name':
                this.setState({
                    error: { ...this.state.error, [key]: nameValidation({ value, input: key }) }
                });
                break;

            case 'phone':
                this.setState({
                    error: { ...this.state.error, [key]: phoneValidation({ value, input: key }) }
                });
                break;

        }
    }
    onBlur = (value, key) => {
        const errorMsg = checkRequired(value)
        this.setState({ error: { ...this.state.error, [key]: errorMsg } })
    }
    checkRequireAllInput = async ()=>{
const {email: emailValue, 
    password: passwordValue,
name: nameValue,
phone: phoneValue} = this.state.value;
const email = checkRequired(emailValue)
const name = checkRequired(nameValue)
const phone = checkRequired(phoneValue)
const password = checkRequired(passwordValue);
this.setState({error:{...this.state.error, email, password, name, phone}})
    }

    onSubmit = async () => {
        await this.checkRequireAllInput();
        const {email, password, name, phone}=this.state.error
        const isValidData = !email&& !name &&!phone&& !password
        if (isValidData){
         try {
           const result= await axios({
               method:"POST",
            url:'http://svcy3.myclass.vn/api/Users/signup',
        data: {...this.state.value, gender: true}
     })
     Alert.alert("You have registered sucessfully. Please turn to Login page to signin")
     this.navigation.navigate(stackName.loginStack, 'LoginStack')
     
        
        } catch (error) {
            if (error.message.includes('400')){

            Alert.alert("Email is ready used")
            
        }
        }
       
    }
    };
    render() {
        const { value, error } = this.state
        // console.log(this.state);
        return (
            <View style={styles.container}>

                <AntIcon name='arrowleft' size={30} style={styles.iconBack} onPress={()=> this.props.navigation.goBack()} />
                <View style={styles.header}>
                    <AntIcon name='lock' size={80} style={{ color: '#26c6da' }} />
                    <Text style={styles.textHeader}> Register</Text>
                </View>

                <View style={styles.loginForm}>

                    <TextInput
                        onBlur={() => this.onBlur(value.email, 'email')}
                        title='Email' placeholder='mail@example.com'
                        autoCapitalize="none"
                        value={value.email}
                        onChangeText={(valueText) => this.onChangeText(valueText, 'email')}
                        errorMsg={error.email} />

                    <TextInput
                        onBlur={() => this.onBlur(value.password, 'password')}
                        title="Password" placeholder='********' secureTextEntry password
                        value={value.password}
                        onChangeText={(value) => this.onChangeText(value, 'password')}
                        errorMsg={error.password} />

                    <TextInput
                        onBlur={() => this.onBlur(value.name, 'name')}
                        title='Name' placeholder="Nguyen Van A"
                        value={value.name}
                        onChangeText={(value) => this.onChangeText(value, 'name')}
                        errorMsg={error.name} />
                    <TextInput
                        onBlur={() => this.onBlur(value.phone, 'phone')}
                        title='Phone' placeholder="0903-xxx-xxx"
                        value={value.phone}
                        onChangeText={(value) => this.onChangeText(value, 'phone')}
                        errorMsg={error.phone} />


                    <TouchableOpacity style={styles.btnLogin} onPress={this.onSubmit}>
                        <Text style={styles.btnLoginText}> Submit</Text>
                    </TouchableOpacity>

                </View>
            
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //    justifyContent:'center',
        //    alignItems:'center'
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50
    },
    textHeader: {
        fontSize: 25,
        paddingTop: 20,
        color: '#006978',
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
    loginForm: {
        flex: 3,


    },
    btnLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        backgroundColor: '#006064',
        height: 50,
        margin: 10,
        borderRadius: 8,

    },

    btnLoginText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20
    },
    // footer: {
    //     flex: 3,
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     marginVertical: 20,
    // },
    // register: {
    //     color: '#006978',
    //     fontSize: 20,
    //     marginLeft: 5
    // },
    // textFooter: {
    //     color: '#aeaeae',
    //     fontSize: 18,
    //     alignSelf: 'center',
    //     paddingTop: 80
    // },
    password: {
        flexDirection: 'row',

    },
    iconBack: {
        color: '#006978',
        marginTop: 40,
        paddingLeft: 10
    }

})