import { Text, View, StyleSheet, TextInput as RNTextInput } from 'react-native'
import React, { Component } from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign'

export default class TextInput extends Component {
  state = {
    secureTextEntry: this.props.secureTextEntry
  }
  render() {
    const { title, password, errorMsg, } = this.props
    const { secureTextEntry } = this.state
    return (
      <View style={styles.wrapperText}>
        <RNTextInput

          style={[styles.textLoginForm, !!errorMsg && styles.bgErrorMsg]}{...this.props}
          secureTextEntry={secureTextEntry} />
        <Text style={styles.textLoginTitle}>{title} </Text>
        {password && (
          <AntIcon name='eye' size={20} style={styles.eyeIcon}
            onPress={() => { this.setState({ secureTextEntry: !this.state.secureTextEntry }) }} />
        )}
        {!!errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

      </View>
    )
  }
}
const styles = StyleSheet.create({
  wrapperText: {
    marginBottom: 10,
    alignItems: 'center'
  },
  textLoginForm:
  {
    height: 50,
    width: 350,
    backgroundColor: '#b2ebf2',
    margin: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 18,
    paddingTop: 20


  },
  bgErrorMsg:
  {
    height: 50,
    width: 350,
    backgroundColor: 'pink',
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 18,
    paddingTop: 20


  },
  textLoginTitle: {
    color: '#aeaeae',
    position: 'absolute',
    top: 10,
    left: 20,
    fontSize: 15
  },
  eyeIcon: {
    color: '#aeaeae',
    paddingTop: 20,
    position: 'absolute',
    right: 25,
  },
  errorText: {
    color: 'red',
    marginLeft: 10

  }
})