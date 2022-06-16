import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { useEffect } from "react";
import { Alert, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useDispatch } from "react-redux";
import { userApi } from "./src/api";
import { setNewToken } from "./src/api/api";
import { Loader } from "./src/components";
import { storage } from "./src/helper";
import { actions } from "./src/redux";
import store from "./src/redux/store";
import {
  Account,
  Cart,
  Checkout,
  Login,
  ProductDetail,
  Register,
} from "./src/screens";
import Main from "./src/screens/Main";

const Stack = createNativeStackNavigator();

const ProtectedRoutes = [
  {
    name: "HOME",
    component: Main,
    headerShown: false,
  },
  {
    name: "LOGIN",
    component: Login,
    headerShown: false,
  },
  {
    name: "REGISTER",
    component: Register,
    headerShown: false,
  },
  {
    name: "PRODUCT_DETAIL",
    component: ProductDetail,
    headerShown: false,
  },
  {
    name: "ACCOUNT",
    component: Account,
    headerShown: false,
  },
  {
    name: "CART",
    component: Cart,
    headerShown: false,
  },
  {
    name: "CHECKOUT",
    component: Checkout,
    headerShown: false,
  },
];

function App() {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            letterSpacing: 1,
            color: "#444",
            fontWeight: "bold",
          }}
        >
          CLOTHING SHOP
        </Text>
      </View>
    );
  }

  const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      async function getMe(id) {
        try {
          const response = await userApi.getMe(id);
          if (response.ok && response.data) {
            const { _id, email, avatar, username, fullname } = response.data[0];
            dispatch(
              actions.user.login({
                id: _id,
                email: email,
                avatar: avatar,
                userName: username,
                fullName: fullname,
              })
            );
          } else {
            Alert.alert(response.data.message);
          }
        } catch (error) {
          Alert.alert("An error occurred");
        }
      }

      async function getToken() {
        try {
          setIsLoading(true);
          const token = await storage.get("token");
          const userId = await storage.get("userId");
          if (token) {
            setNewToken(token);
            getMe(userId);
          }
        } catch (error) {
          Alert.alert("An error occurred");
        }
        setIsLoading(true);
      }

      getToken();
    }, []);

    return <Stack.Navigator>{children}</Stack.Navigator>;
  };

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <ProtectedRoute>
            {ProtectedRoutes.map((item) => (
              <Stack.Screen
                key={item.name}
                name={item.name}
                component={item.component}
                options={{
                  headerShown: item.headerShown,
                }}
              />
            ))}
          </ProtectedRoute>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
