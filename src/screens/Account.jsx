import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { Header } from "../components";

const Account = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        showBackButton={true}
        navigation={navigation}
        title='My Account'
        showCartIcon={false}
      />
      <ScrollView style={styles.container}>
        <Text>Account</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
  },
});
