import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import COLORS from "../../themes";
import EditProfile from "./EditProfile";
import { navigate } from "../../navigation/NavigationWithoutProp";
import { stackName } from "../../configs/navigationConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import fetchData from "../../apis";

export default function ProfileScreen({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("0");
  const [profile, setProfile] = useState(null);

  // const editProfile = () => {
  //   navigate(stackName.editProfileStack);
  // };

  useEffect(() => {
  loadProfile()
   
  }, [route.params]);

  const loadProfile =async() =>{
    const accessToken = await AsyncStorage.getItem("accessToken");
    const { content } = await fetchData(accessToken);
    setProfile(content);
    await AsyncStorage.setItem("Information", JSON.stringify(content));
  }

  const showProfile = () => {
    return (
      <View style={{}}>
        <Text style={styles.textProfile}> {profile.name}</Text>
        <Text style={styles.textProfile}> {profile.email}</Text>
        <Text style={styles.textProfile}> {profile.gender ? "Nam" : "Nu"}</Text>
        <Text style={styles.textProfile}> Tel: {profile.phone}</Text>
      </View>
    ) ;
  };

  return (
    <View style={styles.containerProfile}>
      <View
        style={{
          backgroundColor: COLORS.darkteal,
          borderRadius: 80,
          height: 160,
          width: 160,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 80,
        }}
      >
        <AntDesign name="user" size={90} style={{ color: COLORS.superlightteal }} />
      </View>

      <View
        style={{
          flexDirection: "row",
          margin: 30,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 50,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            marginRight: 10,
            height: 40,
            width: 200,
            borderWidth: 1,
            paddingTop: 5,
            paddingLeft: 15,
          }}
        >
          EDIT PROFILE
        </Text>
        <AntDesign name="edit" size={25} onPress={() =>   navigate(stackName.editProfileStack)} />
      </View>
      {profile &&showProfile()}
    </View>
  );
}
const styles = StyleSheet.create({
  containerProfile: {
    margin: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  textProfile: {
    marginRight: 85,
    fontSize: 25,
    marginBottom: 10,
  },
  textInputProfile: {
    marginBottom: 10,
    borderWidth: 1,
    height: 30,
    borderColor: COLORS.orange,
    padding: 5,
    width: "80%",
    height: 45,
  },
});
