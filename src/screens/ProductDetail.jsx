import { Feather } from "@expo/vector-icons";
import { useRef } from "react";
import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { cartApi, productApi } from "../api";
import { Button, CustomText, Header, Loader } from "../components";
import Color from "../constants/Color";
import { format } from "../helper";
import { actions } from "../redux";

const height = Dimensions.get("window").height;

const ProductDetail = ({ navigation, route }) => {
  let IMAGES = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0akBAMBobdjJlfX5wjHeXzOXh5qG9xdsG2Q&usqp=CAU",
    ,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0akBAMBobdjJlfX5wjHeXzOXh5qG9xdsG2Q&usqp=CAU",
    ,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0akBAMBobdjJlfX5wjHeXzOXh5qG9xdsG2Q&usqp=CAU",
  ];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [listSize, setListSize] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState();
  const [amount, setAmount] = useState(1);
  const [showImage, setShowImage] = useState(IMAGES[0]);

  const { id } = route.params;
  const { isLogin } = useSelector((state) => state.user);
  const { products, totalAmount } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const increase = () => {
    if (!value) {
      Alert.alert("Please select size of item");
      return;
    }
    if (
      amount <
      listSize[listSize.findIndex((e) => e.value == value)].origin.amount
    )
      setAmount(amount + 1);
  };

  const decrease = () => {
    if (!value) {
      Alert.alert("Please select size of item");
      return;
    }
    if (amount > 1) setAmount(amount - 1);
  };

  const addToCart = () => {
    if (!value) {
      Alert.alert("Please select size of item");
      return;
    }
    if (!isLogin) {
      navigation.navigate("LOGIN");
      return;
    }

    dispatch(actions.cart.add_to_cart({ product, amount, size: value }));
    updateCart();
  };

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
        Alert.alert("Added");
      } else {
        Alert.alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getProduct() {
      try {
        setIsLoading(true);
        const response = await productApi.getById(id);
        setIsLoading(false);
        if (response.ok && response.data) {
          setProduct(response.data);

          const listSize = response.data.productInfo.map((e) => ({
            label: e.size,
            value: e.size,
            origin: e,
          }));
          setListSize(listSize);

          if (response.data?.image.includes("https")) {
            IMAGES.unshift(response.data.image);
            setShowImage(IMAGES[0]);
          }
        } else {
          Alert.alert(response.data.message);
        }
      } catch (error) {
        Alert.alert("An error occurred");
        console.log(error);
      }
    }

    getProduct();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={isLoading} />
      <Header navigation={navigation} showBackButton={true} />
      <View style={styles.scrollCtn}>
        <View style={styles.preview}>
          <ScrollView style={styles.listImages}>
            {IMAGES.map((item, index) => (
              <Pressable onPress={() => setShowImage(item)} key={index}>
                <Image
                  source={{ uri: item }}
                  style={styles.imageItem}
                  resizeMode='contain'
                />
              </Pressable>
            ))}
          </ScrollView>
          <View style={styles.imageCtn}>
            {product ? (
              <Image
                source={{
                  // uri: showImage,
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0akBAMBobdjJlfX5wjHeXzOXh5qG9xdsG2Q&usqp=CAU",
                }}
                style={styles.image}
                resizeMode='contain'
              />
            ) : null}
          </View>
        </View>

        {product ? (
          <View style={styles.content}>
            <CustomText text='Lò vi sóng thế hệ mới' style={styles.name} />
            <CustomText text={format.currency(5000000)} style={styles.price} />
            <CustomText text={product.preview} style={styles.description} />

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
                items={listSize}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setListSize}
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

            {value != null ? (
              <CustomText
                text={`Kho: ${
                  listSize[listSize.findIndex((e) => e.value == value)].origin
                    .amount
                }`}
                style={{ marginLeft: 80, marginTop: 10, fontSize: 14 }}
              />
            ) : null}

            <View style={styles.quantityCtn}>
              <TouchableOpacity style={styles.adjust} onPress={decrease}>
                <Feather name='minus' size={18} color='black' />
              </TouchableOpacity>
              <View style={styles.amountCtn}>
                <CustomText text={amount} style={styles.amount} />
              </View>
              <TouchableOpacity style={styles.adjust} onPress={increase}>
                <Feather name='plus' size={18} color='black' />
              </TouchableOpacity>
            </View>

            <View style={styles.button}>
              <Button
                title={"Thêm vào giỏ hàng".toUpperCase()}
                onPress={addToCart}
                disabled={
                  value != null &&
                  listSize[listSize.findIndex((e) => e.value == value)].origin
                    .amount == 0
                }
                color={
                  value != null &&
                  listSize[listSize.findIndex((e) => e.value == value)].origin
                    .amount == 0
                    ? Color.grey999999
                    : Color.purple717fe0
                }
              />
            </View>
          </View>
        ) : null}
      </View>
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
    paddingHorizontal: 40,
  },
});
