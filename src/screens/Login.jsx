import React, { useState } from "react";
import { Keyboard, SafeAreaView, StyleSheet, View } from "react-native";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, CustomText, Input, Loader } from "../components";
import Color from "../constants/Color";
const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      isValid = false;
    }

    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      // let userData = await AsyncStorage.getItem('userData');
      // if (userData) {
      //   userData = JSON.parse(userData);
      //   if (
      //     inputs.email == userData.email &&
      //     inputs.password == userData.password
      //   ) {
      navigation.navigate("HOME");
      //     AsyncStorage.setItem(
      //       'userData',
      //       JSON.stringify({...userData, loggedIn: true}),
      //     );
      //   } else {
      //     Alert.alert('Error', 'Invalid Details');
      //   }
      // } else {
      //   Alert.alert('Error', 'User does not exist');
      // }
    }, 2000);
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading} />
      <View style={styles.header}>
        <CustomText style={styles.loginText} text='Log In' />
        <CustomText
          style={styles.description}
          text='Enter Your Details to Login'
        />
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName='email-outline'
            label='Email'
            placeholder='Enter your email address'
            error={errors.email}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            iconName='lock-outline'
            label='Password'
            placeholder='Enter your password'
            error={errors.password}
            password
          />
          <Button title='Log In' onPress={validate} />
          <CustomText
            onPress={() => navigation.navigate("REGISTER")}
            style={styles.register}
            text="Don't have account? Register"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginText: {
    fontFamily: "Poppins_600SemiBold",
    color: Color.black,
    fontSize: 40,
  },
  description: {
    color: Color.grey999999,
    fontSize: 18,
    marginVertical: 10,
  },
  register: {
    color: Color.black,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
    fontSize: 16,
  },
  container: {
    backgroundColor: Color.white,
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
});

export default LoginScreen;
