import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Banner, Button, Cart, CustomText, ProductItem } from "../components";
import { actions } from "../redux";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const onClick = () => {
    dispatch(actions.cart.add_cart(2));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView style={styles.scrollCtn}>
        <View style={styles.content}>
          <Banner />

          <View style={styles.listProduct}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((e, index) => (
              <ProductItem key={index} title='Product Name' price={100000} />
            ))}
          </View>

          <CustomText text='Home Page' />
          <CustomText text={cart.total} />

          <Button title='test' onPress={onClick} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Header = ({ navigation }) => (
  <View style={styles.containerHeader}>
    <Image source={require("../../assets/logo-01.png")} resizeMode='contain' />

    {/* <Button title='Login' onPress={() => navigation.navigate("LOGIN")} /> */}
    <View style={styles.listIcons}>
      <Cart navigation={navigation} />
      <Feather name='heart' size={24} color='black' style={styles.icon} />
      <Feather name='menu' size={24} color='black' />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollCtn: { flex: 1, marginTop: 50 },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  listProduct: {
    flexWrap: "wrap",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
  },
  containerHeader: {
    display: "flex",
    width: "100%",
    paddingHorizontal: 15,
    paddingTop: 50,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 0,
    zIndex: 100,
  },
  listIcons: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 15,
  },
});

export default Home;
