import React from "react";
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { orderApi } from "../api";
import { Button, CustomText, Header, Input, Loader } from "../components";
import Color from "../constants/Color";
import Regex from "../constants/Regex";
import { format } from "../helper";
import { actions } from "../redux";

const width = Dimensions.get("screen").width;

const Checkout = ({ navigation }) => {
  const { products, totalPrice, totalAmount } = useSelector(
    (state) => state.cart
  );
  const { id, contact, address, fullName } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [inputs, setInputs] = React.useState({
    name: fullName,
    phone: contact,
    address: address,
    // note: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  async function checkout() {
    try {
      setLoading(true);
      const orderProducts = products.map((e) => {
        return { productId: e.product._id, amount: e.amount, size: e.size };
      });

      const response = await orderApi.create({
        userId: id,
        fullname: inputs.name.trim(),
        contact: inputs.phone.trim(),
        address: inputs.address.trim(),
        detail: orderProducts,
        status: 0,
      });
      setLoading(false);

      if (response.ok) {
        dispatch(actions.cart.clear());
        Alert.alert("Order successfully", "", [
          {
            text: "OK",
            onPress: () => navigation.replace("ORDER_STATUS"),
          },
        ]);
      } else {
        console.log(response.config);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.name) {
      handleError("Please input name", "name");
      isValid = false;
    }

    if (!inputs.phone) {
      handleError("Please input phone number", "phone");
      isValid = false;
    } else if (!inputs.phone.match(Regex.vietnamesePhoneNumber)) {
      handleError("Please input a valid phone number", "phone");
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

  // function checkout() {}
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
            onChangeText={(text) => handleOnchange(text, "name")}
            onFocus={() => handleError(null, "name")}
            label='Name'
            placeholder='Enter your name'
            error={errors.name}
            value={inputs.name}
          />

          <Input
            keyboardType='numeric'
            onChangeText={(text) => handleOnchange(text, "phone")}
            onFocus={() => handleError(null, "phone")}
            label='Phone Number'
            placeholder='Enter your phone number'
            error={errors.phone}
            value={inputs.phone}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "address")}
            onFocus={() => handleError(null, "address")}
            label='Address'
            placeholder='Enter your address'
            error={errors.address}
            value={inputs.address}
          />
        </View>

        {products.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
      </ScrollView>
      <View style={{ paddingHorizontal: 15 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <CustomText text='Subtotal:' style={[styles.totalPrice]} />
          <CustomText
            text={format.currency(totalPrice)}
            style={styles.totalPrice}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <CustomText text='Shipping:' style={[styles.totalPrice]} />
          <CustomText text={format.currency(23000)} style={styles.totalPrice} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <CustomText text={`Total(${totalAmount})`} style={styles.total} />
          <CustomText
            text={format.currency(totalPrice + 23000)}
            style={styles.total}
          />
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

const CartItem = ({ item }) => {
  return (
    <View style={styles.cartItem}>
      <Image
        source={
          item.product.image.includes("https")
            ? { uri: item.product.image }
            : require("../../assets/product.jpg")
        }
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
          text={item.product.productname}
          style={styles.name}
          numberOfLines={1}
        />
        <CustomText
          text={`Size: ${item.size}`}
          style={styles.price}
          numberOfLines={1}
        />
        <View style={styles.priceCtn}>
          <CustomText
            text={format.currency(item.product.price)}
            style={styles.price}
          />
          <CustomText text={`x ${item.amount}`} style={styles.price} />
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
    width: "100%",
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
  totalPrice: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
    color: Color.grey555555,
  },
});
