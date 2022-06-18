import moment from "moment";
import { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { CustomText, Header, Loader } from "../components";
import Color from "../constants/Color";
import { format } from "../helper";

const OrderStatus = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState("Pending");

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={isLoading} />
      <Header navigation={navigation} showBackButton={true} />

      <TabBar active={active} onChange={setActive} />

      <ScrollView style={styles.scrollCtn}>
        <OrderItem />
        <OrderItem />
        <OrderItem />
      </ScrollView>
    </SafeAreaView>
  );
};

const TabBar = ({ active, onChange }) => {
  return (
    <View style={styles.tabBarCtn}>
      <Pressable
        style={[styles.tab, { borderBottomWidth: active == "Pending" ? 3 : 0 }]}
        onPress={() => onChange("Pending")}
      >
        <CustomText
          onPress={() => onChange("Pending")}
          text='Pending'
          style={[
            styles.tabTitle,
            {
              fontFamily:
                active == "Pending"
                  ? "Poppins_600SemiBold"
                  : "Poppins_400Regular",
              color: active == "Pending" ? Color.purple717fe0 : Color.text,
            },
          ]}
        />
      </Pressable>

      <Pressable
        style={[
          styles.tab,
          { borderBottomWidth: active == "Shipping" ? 3 : 0 },
        ]}
        onPress={() => onChange("Shipping")}
      >
        <CustomText
          onPress={() => onChange("Shipping")}
          text='Shipping'
          style={[
            styles.tabTitle,
            {
              fontFamily:
                active == "Shipping"
                  ? "Poppins_600SemiBold"
                  : "Poppins_400Regular",
              color: active == "Shipping" ? Color.purple717fe0 : Color.text,
            },
          ]}
        />
      </Pressable>

      <Pressable
        style={[
          styles.tab,
          { borderBottomWidth: active == "Received" ? 3 : 0 },
        ]}
        onPress={() => onChange("Received")}
      >
        <CustomText
          onPress={() => onChange("Received")}
          text='Received'
          style={[
            styles.tabTitle,
            {
              fontFamily:
                active == "Received"
                  ? "Poppins_600SemiBold"
                  : "Poppins_400Regular",
              color: active == "Received" ? Color.purple717fe0 : Color.text,
            },
          ]}
        />
      </Pressable>
    </View>
  );
};

const OrderItem = ({ products, navigation }) => {
  return (
    <View style={styles.orderItem}>
      <CustomText
        text={`Order date: ${moment(Date.now()).format("DD MM yyyy HH:mm")}`}
        style={styles.date}
      />

      {[1, 2, 3].map((item, index) => {
        return <CartItem key={index} />;
      })}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 15,
        }}
      >
        <CustomText text='Total(6): ' style={styles.total} />
        <CustomText text={format.currency(1200000)} style={styles.total} />
      </View>
    </View>
  );
};

const CartItem = ({ item }) => {
  return (
    <View style={styles.cartItem}>
      <Image
        source={require("../../assets/product.jpg")}
        style={styles.image}
      />
      <View
        style={{
          width: "80%",
          paddingHorizontal: 10,
          justifyContent: "space-between",
        }}
      >
        <CustomText
          text={
            item?.product?.productname ?? "This is a name of product abc xyz"
          }
          style={styles.name}
          numberOfLines={1}
        />
        <CustomText
          text={`Size: ${item?.size ?? "XL"}`}
          style={styles.price}
          numberOfLines={1}
        />
        <View style={styles.priceCtn}>
          <CustomText text={format.currency(200000)} style={styles.price} />
          <CustomText text={`x ${item?.amount ?? 2}`} style={styles.price} />
        </View>
      </View>
    </View>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollCtn: {
    flex: 1,
  },
  tabBarCtn: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    height: 50,
    marginTop: 45,
  },
  tab: {
    flex: 1,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Color.purple717fe0,
  },
  tabTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  image: {
    width: 80,
    height: 80,
  },
  cartItem: {
    flexDirection: "row",
    marginHorizontal: 15,
    paddingBottom: 10,
    marginBottom: 10,
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
  orderItem: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Color.purple717fe0,
    marginHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
  },
  total: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
  date: {
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 10,
  },
});
