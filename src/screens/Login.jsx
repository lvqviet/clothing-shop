import React, { useState } from "react";
import { Alert, Keyboard, SafeAreaView, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { authApi } from "../api";
import { setNewToken } from "../api/api";
import { Button, CustomText, Input, Loader } from "../components";
import Color from "../constants/Color";
import { actions } from "../redux";

// import { toast } from "../helper";
const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  // const {login} = useSelector((state) => state.user);

  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    }
    // else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
    //   handleError("Please input a valid email", "email");
    //   isValid = false;
    // }

    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  const login = async () => {
    try {
      setLoading(true);
      const response = await authApi.login({
        username: inputs.email.trim().toLowerCase(),
        password: inputs.password,
      });
      setLoading(false);
      console.log(response);
      if (response.ok && response.data.access_token) {
        const token = response.data.access_token;
        if (token) {
          setNewToken(token);
          dispatch(actions.user.login());
          navigation.navigate("HOME");
        }
      } else {
        Alert.alert("username or password is incorrect");
      }
    } catch (error) {
      console.log(error);
    }
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
