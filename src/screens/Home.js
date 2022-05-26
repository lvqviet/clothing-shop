import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Banner, Button, Cart, CustomText, ProductItem } from "../components";
import Color from "../constants/Color";
import { actions } from "../redux";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const categories = [
    "All Products",
    "Women",
    "Men",
    "Bag",
    "Shoes",
    "Watches",
  ];

  const [categorySelected, setCategorySelected] = useState("All Products");

  const onClick = () => {
    dispatch(actions.cart.add_cart(2));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView style={styles.scrollCtn}>
        <View style={styles.content}>
          <Banner />

          <View style={styles.overviewCtn}>
            <CustomText
              text={"Product Overview".toUpperCase()}
              style={styles.overviewText}
            />
            <View style={styles.categories}>
              {categories.map((item, index) => (
                <CustomText
                  text={item}
                  key={index}
                  onPress={() => setCategorySelected(item)}
                  style={[
                    styles.category,
                    {
                      textDecorationLine:
                        categorySelected == item ? "underline" : "none",
                      color:
                        categorySelected == item
                          ? Color.text
                          : Color.grey999999,
                    },
                  ]}
                />
              ))}
            </View>

            <TouchableOpacity
              style={styles.filter}
              onPress={() => console.log("cc")}
            >
              <Ionicons name='ios-filter' size={20} color={Color.text} />
              <Text style={styles.textFilter}>Filter</Text>
            </TouchableOpacity>
          </View>

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

    <View style={styles.listIcons}>
      <Cart navigation={navigation} />
      <Feather name='heart' size={24} color='black' style={styles.icon} />
      <Feather name='menu' size={24} color='black' />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollCtn: {
    flex: 1,
    marginTop: 50,
  },
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
  overviewCtn: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  overviewText: {
    fontSize: 30,
    fontFamily: "Poppins_600SemiBold",
  },
  categories: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 10,
  },
  category: {
    marginRight: 20,
    fontSize: 16,
  },
  filter: {
    padding: 12,
    borderWidth: 0.5,
    borderColor: Color.grey999999,
    borderRadius: 4,
    marginTop: 10,
    alignSelf: "flex-start",
    flexDirection: "row",
  },
  textFilter: {
    fontSize: 16,
    color: Color.text,
    marginLeft: 7,
    fontFamily: "Poppins_400Regular",
  },
});

export default Home;
