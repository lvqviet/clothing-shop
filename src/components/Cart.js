import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import { StyleSheet, View } from "react-native";
import Color from "../constants/Color";
import CustomText from "./CustomText";

export default function Cart({ navigation }) {
  return (
    <View style={styles.icon}>
      <Entypo
        name='shopping-cart'
        size={24}
        color='black'
        onPress={() => navigation.navigate("LOGIN")}
      />
      <View style={styles.amountCtn}>
        <CustomText text={"3"} style={styles.amount} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 15,
  },
  amountCtn: {
    backgroundColor: Color.purple717fe0,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -10,
    right: -10,
  },
  amount: {
    color: Color.white,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
  },
});
