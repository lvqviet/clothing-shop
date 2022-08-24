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
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [showImage, setShowImage] = useState(IMAGES[0]);

  const { id } = route.params;
  const { isLogin } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const increase = () => {
    if (quantity < product.quantity) setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const addToCart = () => {
    if (!isLogin) {
      navigation.navigate("LOGIN");
      return;
    }

    const findIndex = items.findIndex((e) => e.product._id == product._id);
    // console.log(items, findIndex);
    if (findIndex == -1 && quantity > product.quantity) {
      Alert.alert("Không thể thêm vào giỏ vượt quá số lượng sản phẩm");
      return;
    } else if (
      findIndex != -1 &&
      quantity + items[findIndex].quantity > product.quantity
    ) {
      Alert.alert("Không thể thêm vào giỏ vượt quá số lượng sản phẩm");
      return;
    }

    dispatch(actions.cart.add_to_cart({ product, quantity }));
    updateCart();
  };

  async function updateCart() {
    try {
      setIsLoading(true);
      const genItems = items.map((item) => {
        return {
          productId: item.product._id,
          quantity: item.quantity,
        };
      });
      const params = { items: genItems };
      const response = await cartApi.update(params);
      setIsLoading(false);
      if (response.ok) {
        Alert.alert("Đã thêm vào giỏ hàng");
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

          if (response.data?.pictures[0].includes("https")) {
            IMAGES.unshift(response.data.pictures[0]);
            setShowImage(IMAGES[0]);
            setImages(IMAGES);
          }
        } else {
          Alert.alert(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getProduct();
  }, []);

  // useEffect(() => {
  //   console.log(items);
  //   console.log("====================================");
  //   console.log(totalPrice);
  //   console.log("====================================");
  //   console.log(totalQuantity);
  // }, [items]);

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={isLoading} />
      <Header navigation={navigation} showBackButton={true} />
      <View style={styles.scrollCtn}>
        <View style={styles.preview}>
          <ScrollView
            style={styles.listImages}
            showsVerticalScrollIndicator={false}
          >
            {images.map((item, index) => (
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
                  uri: showImage,
                }}
                style={styles.image}
                resizeMode='contain'
              />
            ) : null}
          </View>
        </View>

        {product ? (
          <View style={styles.content}>
            <CustomText text={product.name} style={styles.name} />
            <CustomText
              text={format.currency(product.price)}
              style={styles.price}
            />
            <CustomText text={product.description} style={styles.description} />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <CustomText
                text={`Kho: ${
                  product?.quantity == 0 ? "Hết hàng" : product?.quantity
                }`}
                style={{ marginTop: 10, fontSize: 14 }}
              />

              <View style={styles.quantityCtn}>
                <TouchableOpacity style={styles.adjust} onPress={decrease}>
                  <Feather name='minus' size={18} color='black' />
                </TouchableOpacity>
                <View style={styles.amountCtn}>
                  <CustomText text={quantity} style={styles.amount} />
                </View>
                <TouchableOpacity style={styles.adjust} onPress={increase}>
                  <Feather name='plus' size={18} color='black' />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.button}>
              <Button
                title={"Thêm vào giỏ hàng".toUpperCase()}
                onPress={addToCart}
                disabled={product?.quantity == 0}
                color={
                  product?.quantity == 0 ? Color.grey999999 : Color.purple717fe0
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
    marginBottom: 20,
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
    marginTop: 20,
  },
});
