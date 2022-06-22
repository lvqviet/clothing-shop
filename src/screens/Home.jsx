import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { cartApi, productApi } from "../api";
import { Banner, CustomText, Header, Loader, ProductItem } from "../components";
import Color from "../constants/Color";
import { actions } from "../redux";

const Home = ({ navigation }) => {
  const [categorySelected, setCategorySelected] = useState("All Products");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    page: 0,
    pageSize: 10,
    isLastPage: false,
  });

  const { id, isLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const onPressItem = (id) => {
    navigation.navigate("PRODUCT_DETAIL", { id });
  };

  async function getProducts() {
    try {
      if (pageInfo.isLastPage || isLoading) {
        return;
      }
      setIsLoading(true);
      const response = await productApi.getProducts(
        pageInfo.page,
        pageInfo.pageSize
      );
      setIsLoading(false);
      if (response.ok && response.data.product) {
        const productsData = response.data.product;
        const total = response.data.total;

        if (pageInfo.page == 0 || products.length == 0) {
          setProducts(productsData);
        } else {
          setProducts([...products, ...productsData]);
        }

        setPageInfo({
          ...pageInfo,
          page: pageInfo.page + 1,
          isLastPage: total <= (pageInfo.page + 1) * pageInfo.pageSize,
        });

        const listTypes = new Set();
        listTypes.add("All Products");
        for (let i = 0; i < productsData.length; i++) {
          listTypes.add(productsData[i].productType);
        }
        setProductTypes(Array.from(listTypes));
      } else {
        Alert.alert(response.data.message);
      }
    } catch (error) {
      Alert.alert("An error occurred");
    }
  }

  async function getCart() {
    try {
      const response = await cartApi.get(id);
      if (response.ok) {
        dispatch(actions.cart.get_cart(response.data));
      } else {
        // Alert.alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (isLogin) getCart();
  }, [isLogin]);

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={isLoading} />
      <Header navigation={navigation} />
      <ScrollView
        style={styles.scrollCtn}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            getProducts();
          }
        }}
        scrollEventThrottle={400}
      >
        <View style={styles.content}>
          <Banner />

          <View style={styles.overviewCtn}>
            <CustomText
              text={"Product Overview".toUpperCase()}
              style={styles.overviewText}
            />
            {productTypes ? (
              <View style={styles.categories}>
                {productTypes.map((item, index) => (
                  <CustomText
                    text={item}
                    key={index}
                    onPress={() => setCategorySelected(item)}
                    style={[
                      styles.category,
                      {
                        textDecorationLine:
                          categorySelected == item ? "underline" : "none",
                        color:
                          categorySelected == item
                            ? Color.text
                            : Color.grey999999,
                      },
                    ]}
                  />
                ))}
              </View>
            ) : null}

            {/* <TouchableOpacity
              style={styles.filter}
              onPress={() => console.log("cc")}
            >
              <Ionicons name='ios-filter' size={20} color={Color.text} />
              <Text style={styles.textFilter}>
                {lowToHigh ? "Low to High" : "High to Low"}
              </Text>
            </TouchableOpacity> */}
          </View>

          <View style={styles.listProduct}>
            {products
              .filter((e) => {
                if (categorySelected === "All Products") return true;
                else {
                  return e.productType == categorySelected;
                }
              })
              .map((item, index) => (
                <ProductItem
                  key={index}
                  title={item.productname}
                  price={item.price}
                  image={item.image}
                  onPress={() => onPressItem(item._id)}
                />
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollCtn: {
    flex: 1,
    marginTop: 45,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  listProduct: {
    flexWrap: "wrap",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
  },
  overviewCtn: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  overviewText: {
    fontSize: 30,
    fontFamily: "Poppins_600SemiBold",
  },
  categories: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 10,
  },
  category: {
    marginRight: 15,
    fontSize: 16,
  },
  filter: {
    padding: 12,
    borderWidth: 0.5,
    borderColor: Color.grey999999,
    borderRadius: 4,
    marginTop: 10,
    alignSelf: "flex-start",
    flexDirection: "row",
  },
  textFilter: {
    fontSize: 16,
    color: Color.text,
    marginLeft: 7,
    fontFamily: "Poppins_400Regular",
  },
});

export default Home;
