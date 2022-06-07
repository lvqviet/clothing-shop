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
import { Account, Cart, Login, ProductDetail, Register } from "./src/screens";
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

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
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
            {/* <Stack.Screen
              name='HOME'
              component={Main}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='PRODUCT_DETAIL'
              component={ProductDetail}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='LOGIN'
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='REGISTER'
              component={Register}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='ACCOUNT'
              component={Account}
              options={{
                headerShown: false,
              }}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
