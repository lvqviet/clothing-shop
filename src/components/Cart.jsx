import Entypo from "@expo/vector-icons/Entypo";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import Color from "../constants/Color";
import CustomText from "./CustomText";

export default function Cart({ navigation }) {
  const { isLogin } = useSelector((state) => state.user);
  const { totalAmount } = useSelector((state) => state.cart);

  function onPress() {
    if (isLogin) navigation.navigate("CART");
    else navigation.navigate("LOGIN");
  }
  return (
    <View style={styles.icon}>
      <Entypo name='shopping-cart' size={24} color='black' onPress={onPress} />
      <View style={styles.amountCtn}>
        <CustomText text={totalAmount} style={styles.amount} />
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
