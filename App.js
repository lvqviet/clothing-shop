import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./src/redux/store";
// import { Home, Login, Main, ProductDetail, Register } from "./src/screens";
import { Ionicons } from "@expo/vector-icons";
import Color from "./src/constants/Color";
import Main from "./src/screens/Main";

// const Stack = createNativeStackNavigator();

// const ProtectedRoutes = [
//   // {
//   //   name: "MAIN",
//   //   component: Main,
//   //   headerShown: false,
//   // },
//   {
//     name: "HOME",
//     component: Home,
//     headerShown: false,
//   },
//   {
//     name: "LOGIN",
//     component: Login,
//     headerShown: false,
//   },
//   {
//     name: "REGISTER",
//     component: Register,
//     headerShown: false,
//   },
//   {
//     name: "PRODUCT_DETAIL",
//     component: ProductDetail,
//     headerShown: false,
//   },
// ];

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

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
