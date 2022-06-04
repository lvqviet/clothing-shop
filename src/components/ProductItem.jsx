import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Color from "../constants/Color";
import CustomText from "./CustomText";

const width = Dimensions.get("window").width;

const ProductItem = ({ title, price, onPress = () => {} }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <Image
        source={require("../../assets/product.jpg")}
        resizeMode='contain'
        style={styles.image}
      />
      <View style={styles.info}>
        <CustomText text={title} style={styles.title} />
        <CustomText text={`${price}đ`} style={styles.price} />
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 15,
    elevation: 5,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    color: Color.grey999999,
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
  },
});
