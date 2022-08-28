import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { orderApi, productApi } from "../api";
import { Button, CustomText, Header, Input, Loader } from "../components";
import Color from "../constants/Color";
import { format } from "../helper";
import { AntDesign } from "@expo/vector-icons";

const OrderStatus = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [active, setActive] = useState("created"); // created shipping delivered cancelled
  const [orders, setOrders] = useState([]);

  async function getOrders() {
    try {
      setIsLoading(true);
      const response = await orderApi.getAll();
      setIsLoading(false);
      if (response.ok && response.data) {
        setOrders(response.data.reverse());
      } else {
        Alert.alert("An error occurred");
      }
    } catch (error) {}
  }

  async function confirmReceived(id) {
    try {
      setIsLoading(true);
      const response = await orderApi.received(id);
      setIsLoading(false);
      if (response.ok) {
        getOrders();
      } else {
        Alert.alert("An error occurred");
      }
    } catch (error) {}
  }

  async function confirmCancel(id) {
    try {
      setIsLoading(true);
      const response = await orderApi.cancel(id);
      setIsLoading(false);
      if (response.ok) {
        getOrders();
      } else {
        Alert.alert("An error occurred");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function showPopupConfirm(status, id) {
    Alert.alert(
      status === "shipping" ? "Xác nhận đã nhận hàng?" : "Xác nhận huỷ đơn?",
      "",
      [
        {
          text: "Huỷ",
          style: "cancel",
        },
        {
          text: "OK",
          onPress:
            status == "shipping"
              ? () => confirmReceived(id)
              : () => confirmCancel(id),
        },
      ]
    );
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
                    onPressButton={() =>
                      showPopupConfirm(item.status, item._id)
                    }
                    key={index}
                  />
                );
              })
          : null}
      </ScrollView>
      <View style={{ paddingHorizontal: 20 }}>
        <Button
          title={"Về trang chủ"}
          onPress={() => navigation.navigate("HOME")}
        />
      </View>
    </SafeAreaView>
  );
};

const TabBar = ({ active, onChange }) => {
  return (
    <View style={styles.tabBarCtn}>
      <Pressable
        style={[styles.tab, { borderBottomWidth: active == "created" ? 3 : 0 }]}
        onPress={() => onChange("created")}
      >
        <CustomText
          onPress={() => onChange("created")}
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
        style={[
          styles.tab,
          { borderBottomWidth: active == "shipping" ? 3 : 0 },
        ]}
        onPress={() => onChange("shipping")}
      >
        <CustomText
          onPress={() => onChange("shipping")}
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
        style={[
          styles.tab,
          { borderBottomWidth: active == "delivered" ? 3 : 0 },
        ]}
        onPress={() => onChange("delivered")}
      >
        <CustomText
          onPress={() => onChange("delivered")}
          text='Delivered'
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

      <Pressable
        style={[
          styles.tab,
          { borderBottomWidth: active == "cancelled" ? 3 : 0 },
        ]}
        onPress={() => onChange("cancelled")}
      >
        <CustomText
          onPress={() => onChange("cancelled")}
          text='Cancelled'
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

const OrderItem = ({ item, onPressButton }) => {
  let totalQuantity = 0;
  item.items.forEach((e) => {
    totalQuantity += e.quantity;
  });

  return (
    <View style={styles.orderItem}>
      <CustomText
        text={`Ngày đặt: ${
          moment(item?.createdAt).format("HH:mm DD/MM/yyyy") ?? ""
        }`}
        style={styles.date}
      />

      {item.items.map((e, index) => {
        return <CartItem key={index} item={e} status={item.status} />;
      })}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 15,
        }}
      >
        <CustomText text={`Tổng(${totalQuantity}): `} style={styles.total} />
        <CustomText
          text={format.currency(
            item.totalPayment + item.deliveryFee - item.discount
          )}
          style={styles.total}
        />
      </View>
      <CustomText
        text={`Số điện thoại: ${item.phoneNumber}`}
        style={[styles.name, { paddingHorizontal: 15, marginTop: 5 }]}
      />

      <CustomText
        text={`Địa chỉ: ${item.address}`}
        style={[styles.name, { paddingHorizontal: 15, marginTop: 5 }]}
      />

      {item.status == "shipping" || item.status == "created" ? (
        <View style={{ paddingHorizontal: 100 }}>
          <Button
            title={item.status == "shipping" ? "Đã nhận" : "Huỷ"}
            onPress={onPressButton}
          />
        </View>
      ) : null}
    </View>
  );
};

const CartItem = ({ item, status }) => {
  const [showModal, setShowModal] = useState(false);
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState("");
  const [textBtn, setTextBtn] = useState("Đánh giá");

  async function sendRating() {
    try {
      const params = {
        rate: star,
        comment,
      };
      const res = await productApi.sendRating(item.product._id, params);
      if (res.ok) {
        setTextBtn("Đã đánh giá");
        setShowModal(false);
      } else {
        Alert.alert("An error occurred");
        console.log(res.data);
      }
    } catch (error) {}
  }

  return (
    <>
      <View style={styles.cartItem}>
        <Image
          source={
            item.product.pictures[0].includes("https")
              ? {
                  uri: item.product.pictures[0],
                }
              : require("../../assets/product.jpg")
          }
          style={styles.image}
          resizeMode='contain'
        />
        <View
          style={{
            width: "80%",
            paddingHorizontal: 10,
            justifyContent: "space-between",
          }}
        >
          <CustomText
            text={item.product.name}
            style={styles.name}
            numberOfLines={1}
          />

          <View style={styles.priceCtn}>
            <CustomText
              text={format.currency(item.product.price)}
              style={styles.price}
            />
            <CustomText
              text={`x ${item?.quantity ?? 2}`}
              style={styles.price}
            />
          </View>
        </View>
      </View>
      {status === "delivered" && (
        <View style={{ paddingHorizontal: 100 }}>
          <Button title={textBtn} onPress={() => setShowModal(true)} />
        </View>
      )}
      <Modal visible={showModal} style={styles.modal} animationType='slide'>
        <SafeAreaView>
          <View style={styles.cartItem}>
            <Image
              source={
                item.product.pictures[0].includes("https")
                  ? {
                      uri: item.product.pictures[0],
                    }
                  : require("../../assets/product.jpg")
              }
              style={styles.image}
              resizeMode='contain'
            />
            <View
              style={{
                width: "80%",
                paddingHorizontal: 10,
                justifyContent: "space-between",
              }}
            >
              <CustomText
                text={item.product.name}
                style={styles.name}
                numberOfLines={1}
              />

              <View style={styles.priceCtn}>
                <CustomText
                  text={format.currency(item.product.price)}
                  style={styles.price}
                />
                <CustomText
                  text={`x ${item?.quantity ?? 2}`}
                  style={styles.price}
                />
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {Array.from(Array(5)).map((value, index) => {
              if (index < star) {
                return (
                  <AntDesign
                    name='star'
                    size={30}
                    key={index}
                    onPress={() => setStar(index + 1)}
                    color='#FCBD21'
                  />
                );
              } else {
                return (
                  <AntDesign
                    name='staro'
                    size={30}
                    key={index}
                    onPress={() => setStar(index + 1)}
                    color='#FCBD21'
                  />
                );
              }
            })}
          </View>

          <View style={{ paddingHorizontal: 20 }}>
            <Input
              numberOfLines={5}
              onChangeText={setComment}
              label='Đánh giá của bạn:'
              placeholder='Nhập đánh giá'
              maxLine={5}
            />
            <Button
              title='Gửi đánh giá'
              onPress={sendRating}
              disabled={star == 0}
            />
            <Button title='Huỷ' onPress={() => setShowModal(false)} />
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  modal: {
    margin: 20,
    height: 300,
    width: 200,
    borderRadius: 10,
    backgroundColor: Color.white,
  },
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
