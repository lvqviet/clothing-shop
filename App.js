import { Poppins_400Regular, useFonts } from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { Home, Login, Register } from "./src/screens";

const Stack = createNativeStackNavigator();

const ProtectedRoutes = [
  {
    name: "HOME",
    component: Home,
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
];

export const ProtectedRoute = ({ children }) => (
  <Stack.Navigator
    initialRouteName='HOME'
    screenOptions={{ gestureDirection: "horizontal" }}
  >
    {children}
  </Stack.Navigator>
);

function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
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
          <ProtectedRoute>
            {ProtectedRoutes.map((item) => (
              <Stack.Screen
                key={item.name}
                name={item.name}
                component={item.component}
                options={{
                  title: item.title,
                  header: item.header,
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
