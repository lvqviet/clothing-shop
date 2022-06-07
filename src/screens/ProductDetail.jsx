import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Button, CustomText, Header } from "../components";
import DropDownPicker from "react-native-dropdown-picker";
import Color from "../constants/Color";
import { Feather } from "@expo/vector-icons";

const IMAGES = [
  {
    source:
      "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png",
  },
  {
    source: "https://i.imgur.com/UPrs1EWl.jpg",
  },
  {
    source: "https://i.imgur.com/MABUbpDl.jpg",
  },
  {
    source: "https://i.imgur.com/KZsmUi2l.jpg",
  },
  {
    source: "https://picsum.photos/id/11/200/300",
  },
];

const height = Dimensions.get("window").height;

const ProductDetail = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} showBackButton={true} />
      <ScrollView style={styles.scrollCtn}>
        <View style={styles.preview}>
          <ScrollView style={styles.listImages}>
            {IMAGES.map((item, index) => (
              <Image
                source={{ uri: item.source }}
                key={index}
                style={styles.imageItem}
              />
            ))}
          </ScrollView>
          <View style={styles.imageCtn}>
            <Image
              source={require("../../assets/product.jpg")}
              style={styles.image}
            />
          </View>
        </View>

        <View style={styles.content}>
          <CustomText text='Lightweight Jacket' style={styles.name} />
          <CustomText text={`${100000}đ`} style={styles.price} />
          <CustomText
            text={
              "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat."
            }
            style={styles.description}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
              zIndex: 100,
            }}
          >
            <CustomText text='Size' style={styles.option} />
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={{
                borderRadius: 1,
                borderColor: Color.greye6e6e6,
                maxWidth: 250,
              }}
              disableBorderRadius={true}
              containerStyle={{
                width: 250,
              }}
            />
          </View>

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

          <View style={styles.button}>
            <Button
              title={"Add to cart".toUpperCase()}
              onPress={() => console.log("added")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollCtn: {
    flex: 1,
    marginTop: 45,
  },
  listImages: {
    width: "20%",
    paddingVertical: 10,
    marginRight: 12,
  },
  imageItem: {
    width: "100%",
    height: 80,
    marginBottom: 15,
    alignSelf: "center",
  },
  imageCtn: {
    width: "80%",
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: "100%",
  },
  preview: {
    height: height * 0.4,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 12,
  },
  content: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  name: {
    fontFamily: "Poppins_400Regular",
    fontSize: 30,
  },
  price: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    marginTop: 15,
    marginBottom: 20,
  },
  description: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
  option: {
    fontSize: 16,
    color: Color.text,
    width: 80,
  },
  quantityCtn: {
    minWidth: 120,
    height: 40,
    borderRadius: 1,
    borderWidth: 1,
    marginLeft: 80,
    marginTop: 20,
    flexDirection: "row",
    borderColor: Color.greye6e6e6,
    alignSelf: "flex-start",
  },
  adjust: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  amountCtn: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 40,
    borderStartWidth: 1,
    borderEndWidth: 1,
    borderStartColor: Color.greye6e6e6,
    borderEndColor: Color.greye6e6e6,
  },
  amount: {
    fontSize: 14,
  },
  button: {
    paddingHorizontal: 80,
  },
});
