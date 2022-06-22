import { Feather, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { cartApi } from "../api";
import { Button, CustomText, Header, Loader } from "../components";
import Color from "../constants/Color";
import { format } from "../helper";
import { actions } from "../redux";

const width = Dimensions.get("screen").width;
const Cart = ({ navigation }) => {
  const { products, totalPrice, totalAmount, id } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  function showConfirmDelete(item) {
    Alert.alert("Delete selected item?", "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => deleteItem(item),
      },
    ]);
  }

  async function deleteItem(item) {
    dispatch(actions.cart.delete_item({ item }));
  }

  function increaseAmount(item) {
    const { productInfo } = item.product;
    const maxQuantity =
      productInfo[productInfo.findIndex((e) => e.size == item.size)].amount;
    if (item.amount >= maxQuantity) return;
    dispatch(actions.cart.increase_amount({ item }));
  }

  function decreaseAmount(item) {
    if (item.amount == 1) return;
    dispatch(actions.cart.decrease_amount({ item }));
  }

  async function checkout() {
    // await updateCart();
    navigation.navigate("CHECKOUT");
  }

  async function updateCart() {
    try {
      setIsLoading(true);
      const genProducts = products.map((item) => {
        return {
          productId: item.product._id,
          amount: item.amount,
          size: item.size,
        };
      });
      const params = { detail: genProducts, status: 0 };
      const response = await cartApi.update(id, params);
      setIsLoading(false);
      if (response.ok && response.data) {
        // Alert.alert("Saved");
      } else {
        Alert.alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    updateCart();
  }, [products]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Loader visible={isLoading} />
      <Header
        title='Cart'
        navigation={navigation}
        showBackButton={true}
        showCartIcon={false}
      />
      <ScrollView style={{ marginTop: 45, paddingTop: 10 }}>
        {products.map((item, index) => (
          <CartItem
            item={item}
            key={index}
            onDelete={() => showConfirmDelete(item)}
            increaseAmount={() => increaseAmount(item)}
            decreaseAmount={() => decreaseAmount(item)}
          />
        ))}
      </ScrollView>
      <View style={{ paddingHorizontal: 15 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <CustomText text={`Total(${totalAmount})`} style={styles.total} />
          <CustomText text={format.currency(totalPrice)} style={styles.total} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          {/* <View style={{ width: "45%" }}>
            <Button
              title='Save Cart'
              disabled={products.length == 0}
              onPress={updateCart}
              color={products.length > 0 ? Color.black : Color.grey999999}
            />
          </View> */}
          <View style={{ width: "80%" }}>
            <Button
              title='Checkout'
              disabled={products.length == 0}
              onPress={checkout}
              color={products.length > 0 ? Color.black : Color.grey999999}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const CartItem = ({ item, onDelete, increaseAmount, decreaseAmount }) => {
  return (
    <View style={styles.cartItem}>
      <Ionicons
        name='close'
        size={24}
        color={Color.black}
        style={styles.close}
        onPress={onDelete}
      />
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
          maxWidth: width - 120,
          paddingHorizontal: 10,
          justifyContent: "space-between",
        }}
      >
        <View style={{ maxWidth: "90%" }}>
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
        </View>

        <View style={styles.priceCtn}>
          <CustomText
            text={format.currency(item.product.price)}
            style={styles.price}
          />

          <View style={styles.quantityCtn}>
            <View style={styles.adjust}>
              <Feather
                name='minus'
                size={18}
                color='black'
                onPress={decreaseAmount}
              />
            </View>
            <View style={styles.amountCtn}>
              <CustomText text={item.amount} style={styles.amount} />
            </View>
            <View style={styles.adjust}>
              <Feather
                name='plus'
                size={18}
                color='black'
                onPress={increaseAmount}
              />
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
    width: "100%",
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
  close: {
    position: "absolute",
    top: -10,
    right: 0,
    zIndex: 1000,
  },
});
