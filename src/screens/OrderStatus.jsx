import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { orderApi } from "../api";
import { Button, CustomText, Header, Loader } from "../components";
import Color from "../constants/Color";
import { format } from "../helper";

const OrderStatus = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState(0); // 0: pending, 1: shipping, 2: received
  const [orders, setOrders] = useState([]);

  const { id } = useSelector((state) => state.user);

  async function getOrders() {
    try {
      setIsLoading(true);
      const response = await orderApi.getAll(id);
      setIsLoading(false);
      if (response.ok && response.data) {
        setOrders(response.data);
      } else {
        Alert.alert("An error occurred");
      }
    } catch (error) {}
  }

  async function confirmReceived(id) {
    try {
      setIsLoading(true);
      const response = await orderApi.updateStatus(id, { status: 2 });
      setIsLoading(false);
      if (response.ok) {
        getOrders();
      } else {
        Alert.alert("An error occurred");
      }
    } catch (error) {}
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={isLoading} />
      <Header navigation={navigation} showBackButton={true} />

      <TabBar active={active} onChange={setActive} />

      <ScrollView style={styles.scrollCtn}>
        {orders
          ? orders
              .filter((item) => item.status == active)
              .map((item, index) => {
                return (
                  <OrderItem
                    item={item}
                    confirmReceived={() => confirmReceived(item._id)}
                    key={index}
                  />
                );
              })
          : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const TabBar = ({ active, onChange }) => {
  return (
    <View style={styles.tabBarCtn}>
      <Pressable
        style={[styles.tab, { borderBottomWidth: active == 0 ? 3 : 0 }]}
        onPress={() => onChange(0)}
      >
        <CustomText
          onPress={() => onChange(0)}
          text='Pending'
          style={[
            styles.tabTitle,
            {
              fontFamily:
                active == 0 ? "Poppins_600SemiBold" : "Poppins_400Regular",
              color: active == 0 ? Color.purple717fe0 : Color.text,
            },
          ]}
        />
      </Pressable>

      <Pressable
        style={[styles.tab, { borderBottomWidth: active == 1 ? 3 : 0 }]}
        onPress={() => onChange(1)}
      >
        <CustomText
          onPress={() => onChange(1)}
          text='Shipping'
          style={[
            styles.tabTitle,
            {
              fontFamily:
                active == 1 ? "Poppins_600SemiBold" : "Poppins_400Regular",
              color: active == 1 ? Color.purple717fe0 : Color.text,
            },
          ]}
        />
      </Pressable>

      <Pressable
        style={[styles.tab, { borderBottomWidth: active == 2 ? 3 : 0 }]}
        onPress={() => onChange(2)}
      >
        <CustomText
          onPress={() => onChange(2)}
          text='Received'
          style={[
            styles.tabTitle,
            {
              fontFamily:
                active == 2 ? "Poppins_600SemiBold" : "Poppins_400Regular",
              color: active == 2 ? Color.purple717fe0 : Color.text,
            },
          ]}
        />
      </Pressable>
    </View>
  );
};

const OrderItem = ({ item, confirmReceived }) => {
  let totalAmount = 0,
    totalPrice = 0;
  item.detail.forEach((e) => {
    totalAmount += e.amount;
    totalPrice += e.product.price * e.amount;
  });

  return (
    <View style={styles.orderItem}>
      <CustomText
        text={`Order date: ${
          moment(item?.paymentDate).format("HH:mm DD/MM/yyyy") ?? ""
        }`}
        style={styles.date}
      />

      {item.detail.map((e, index) => {
        return <CartItem key={index} item={e} />;
      })}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 15,
        }}
      >
        <CustomText text={`Total(${totalAmount}): `} style={styles.total} />
        <CustomText
          text={format.currency(totalPrice + 23000)}
          style={styles.total}
        />
      </View>

      {item.status == 1 ? (
        <View style={{ paddingHorizontal: 100 }}>
          <Button title='Received' onPress={confirmReceived} />
        </View>
      ) : null}
    </View>
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
          <CustomText
            text={format.currency(item.product.price)}
            style={styles.price}
          />
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
