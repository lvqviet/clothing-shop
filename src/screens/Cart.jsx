import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import { Button, CustomText, Header } from "../components";
import Color from "../constants/Color";
import { Feather } from "@expo/vector-icons";

const width = Dimensions.get("screen").width;
const Cart = ({ navigation }) => {
  function checkout() {
    navigation.navigate("CHECKOUT");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        title='Cart'
        navigation={navigation}
        showBackButton={true}
        showCartIcon={false}
      />
      <ScrollView style={{ marginTop: 45 }}>
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </ScrollView>
      <View style={{ paddingHorizontal: 15 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <CustomText text='Subtotal:' style={[styles.totalPrice]} />
          <CustomText text='123.000d' style={styles.totalPrice} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <CustomText text='Shipping:' style={[styles.totalPrice]} />
          <CustomText text='23.000d' style={styles.totalPrice} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <CustomText text='Total(7)' style={styles.total} />
          <CustomText text='146.000d' style={styles.total} />
        </View>
        <View>
          <Button title='Checkout' onPress={checkout} color={Color.black} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const CartItem = () => {
  return (
    <View style={styles.cartItem}>
      <Image
        source={require("../../assets/product.jpg")}
        style={styles.image}
      />
      <View
        style={{
          maxWidth: width - 130,
          paddingHorizontal: 10,
          justifyContent: "space-between",
        }}
      >
        <CustomText
          text='Fresh Strawberries Fresh Strawberries Fresh Strawberries Fresh Strawberries'
          style={styles.name}
          numberOfLines={1}
        />
        <CustomText text='Size: M' style={styles.price} numberOfLines={1} />
        <View style={styles.priceCtn}>
          <CustomText text='20.000d' style={styles.price} />

          <View style={styles.quantityCtn}>
            <View style={styles.adjust}>
              <Feather name='plus' size={18} color='black' />
            </View>
            <View style={styles.amountCtn}>
              <CustomText text={1} style={styles.amount} />
            </View>
            <View style={styles.adjust}>
              <Feather name='minus' size={18} color='black' />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  cartItem: {
    flexDirection: "row",
    marginHorizontal: 15,
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Color.greye6e6e6,
  },
  name: {
    fontSize: 18,
    fontFamily: "Poppins_500Medium",
    color: Color.grey555555,
  },
  priceCtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  price: {
    fontSize: 18,
    color: Color.grey555555,
  },
  quantityCtn: {
    minWidth: 90,
    height: 30,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: Color.greye6e6e6,
    flexDirection: "row",
  },
  adjust: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  amountCtn: {
    alignItems: "center",
    justifyContent: "center",
    borderStartWidth: 1,
    borderEndWidth: 1,
    borderStartColor: Color.greye6e6e6,
    borderEndColor: Color.greye6e6e6,
    paddingHorizontal: 12,
  },
  amount: {
    fontSize: 12,
  },
  total: {
    fontSize: 22,
    fontFamily: "Poppins_600SemiBold",
  },
  totalPrice: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
    color: Color.grey555555,
  },
});
