import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { CustomText } from "../components";
import Color from "../constants/Color";
import { actions } from "../redux";

const menuAccount = [
  { title: "My Account", screen: "ACCOUNT" },
  { title: "Order Status", screen: "REGISTER" },
  { title: "Logout", screen: "" },
];
const Profile = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/logo-01.png")}
          resizeMode='contain'
          style={{ alignSelf: "center", marginBottom: 30 }}
        />
        {menuAccount.map((item, index) => {
          return (
            <View key={index}>
              <MenuItem
                title={item.title}
                screen={item.screen}
                navigation={navigation}
              />
              {index < menuAccount.length - 1 ? (
                <View style={styles.divide} />
              ) : null}
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const MenuItem = ({ title, screen, navigation }) => {
  const dispatch = useDispatch();

  function onPress() {
    if (screen != "") navigation.navigate(screen);
    else {
      dispatch(actions.user.logout());
    }
  }
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <CustomText text={title} style={styles.title} onPress={onPress} />
    </TouchableOpacity>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  menuItem: {
    paddingVertical: 20,
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
    alignSelf: "flex-start",
  },
  divide: {
    height: 2,
    width: "100%",
    backgroundColor: Color.greye6e6e6,
  },
});
