import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import Color from "../constants/Color";
import { MainStackNavigator } from "../navigation/RootNavigator";
import Account from "./Account";

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={MainStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name='home' color={Color.black} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name='Account'
        component={Account}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name='account'
              color={Color.black}
              size={20}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({});
