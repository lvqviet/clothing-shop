import React from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, CustomText, Header, Input, Loader } from "../components";
import Color from "../constants/Color";

const width = Dimensions.get("screen").width;

const Checkout = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    note: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      isValid = false;
    }

    if (!inputs.name) {
      handleError("Please input name", "name");
      isValid = false;
    }

    if (!inputs.phone) {
      handleError("Please input phone number", "phone");
      isValid = false;
    }

    if (!inputs.address) {
      handleError("Please input address", "address");
      isValid = false;
    }

    if (isValid) {
      checkout();
    }
  };

  function checkout() {}
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Loader visible={loading} />
      <Header
        title='Checkout'
        navigation={navigation}
        showBackButton={true}
        showCartIcon={false}
      />
      <ScrollView style={{ marginTop: 45 }}>
        <View style={{ marginVertical: 10, marginHorizontal: 15 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            label='Email'
            placeholder='Enter your email address'
            error={errors.email}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "name")}
            onFocus={() => handleError(null, "name")}
            label='Name'
            placeholder='Enter your name'
            error={errors.name}
          />

          <Input
            keyboardType='numeric'
            onChangeText={(text) => handleOnchange(text, "phone")}
            onFocus={() => handleError(null, "phone")}
            label='Phone Number'
            placeholder='Enter your phone number'
            error={errors.phone}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "address")}
            onFocus={() => handleError(null, "address")}
            label='Address'
            placeholder='Enter your address'
            error={errors.address}
          />
        </View>

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
          <CustomText text='Total(7):' style={styles.total} />
          <CustomText text='146.000d' style={styles.total} />
        </View>
        <View>
          <Button
            title='Proceed To Checkout'
            onPress={validate}
            color={Color.black}
          />
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
          <CustomText text='x 2' style={styles.price} />
        </View>
      </View>
    </View>
  );
};

export default Checkout;

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
  total: {
    fontSize: 22,
    fontFamily: "Poppins_600SemiBold",
  },
});
