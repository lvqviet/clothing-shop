import { Feather, Ionicons } from "@expo/vector-icons";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Button, CustomText, Header } from "../components";
import Color from "../constants/Color";
import { format } from "../helper";
import { actions } from "../redux";

const width = Dimensions.get("screen").width;
const Cart = ({ navigation }) => {
  const { products, totalPrice, totalAmount } = useSelector(
    (state) => state.cart
  );

  const dispatch = useDispatch();

  function deleteItem(item) {
    dispatch(actions.cart.delete_item({ item }));
  }

  function increaseAmount(item) {
    dispatch(actions.cart.increase_amount({ item }));
  }
  function decreaseAmount(item) {
    dispatch(actions.cart.decrease_amount({ item }));
  }

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
      <ScrollView style={{ marginTop: 45, paddingTop: 10 }}>
        {products.map((item, index) => (
          <CartItem
            item={item}
            key={index}
            onDelete={() => deleteItem(item)}
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
        <View>
          <Button
            title='Checkout'
            disabled={products.length == 0}
            onPress={checkout}
            color={products.length > 0 ? Color.black : Color.grey999999}
          />
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
        source={require("../../assets/product.jpg")}
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
