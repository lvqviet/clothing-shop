// import AsyncStorage from '@react-native-async-storage/async-storage';
import React from "react";
import {
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { authApi, cartApi } from "../api";
import { setNewToken } from "../api/api";
import { Button, CustomText, Input, Loader } from "../components";
import Color from "../constants/Color";
import Regex from "../constants/Regex";
import { storage } from "../helper";
import { actions } from "../redux";

const Register = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    fullname: "",
    phone: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    } else if (!inputs.email.match(Regex.email)) {
      handleError("Please input a valid email", "email");
      isValid = false;
    }

    if (!inputs.fullname) {
      handleError("Please input fullname", "fullname");
      isValid = false;
    }

    if (!inputs.phone) {
      handleError("Please input phone number", "phone");
      isValid = false;
    } else if (!inputs.phone.match(Regex.vietnamesePhoneNumber)) {
      handleError("Please input a valid phone number", "phone");
      isValid = false;
    }

    if (!inputs.username) {
      handleError("Please input user name", "username");
      isValid = false;
    } else if (inputs.username.indexOf(" ") >= 0) {
      handleError("User name can't contain spaces", "username");
      isValid = false;
    }

    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError("Min password length of 5", "password");
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = async () => {
    try {
      setLoading(true);
      const response = await authApi.register({
        email: inputs.email.trim().toLowerCase(),
        contact: inputs.phone.trim(),
        fullname: inputs.fullname.trim(),
        username: inputs.username.trim(),
        password: inputs.password,
        address: "",
      });
      if (response.ok && response.data.accessToken) {
        const { accessToken } = response.data;
        const { id, email, avatar, username, fullName, contact, address } =
          response.data.userData;
        if (accessToken) {
          await storage.set("token", accessToken);
          await storage.set("userId", id);
          setNewToken(accessToken);
          dispatch(
            actions.user.login({
              id: id,
              email: email,
              avatar: avatar,
              userName: username,
              fullName,
              contact,
              address,
            })
          );
          await createCart(id);
          setLoading(false);
          navigation.navigate("HOME");
        }
      } else {
        Alert.alert(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function createCart(userId) {
    try {
      const response = await cartApi.create({
        userId,
        detail: [],
        status: 0,
      });
      if (!response.ok) {
        Alert.alert("create cart failed");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading} />
      <ScrollView contentContainerStyle={styles.contentCtn}>
        <CustomText style={styles.register} text='Register' />

        <CustomText
          style={styles.title}
          text='Enter Your Details to Register'
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
            keyboardType='numeric'
            onChangeText={(text) => handleOnchange(text, "phone")}
            onFocus={() => handleError(null, "phone")}
            iconName='phone-outline'
            label='Phone Number'
            placeholder='Enter your phone number'
            error={errors.phone}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "fullname")}
            onFocus={() => handleError(null, "fullname")}
            iconName='account-outline'
            label='Full Name'
            placeholder='Enter your full name'
            error={errors.fullname}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, "username")}
            onFocus={() => handleError(null, "username")}
            iconName='account-outline'
            label='User Name'
            placeholder='Enter your user name'
            error={errors.username}
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
          <Button title='Register' onPress={validate} />
          <CustomText
            text='Already have account ?Login'
            onPress={() => navigation.goBack()}
            style={styles.login}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    flex: 1,
  },
  contentCtn: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  register: {
    color: Color.black,
    fontSize: 40,
    fontFamily: "Poppins_600SemiBold",
  },
  title: {
    color: Color.grey999999,
    fontSize: 18,
    marginVertical: 10,
  },
  login: {
    color: Color.black,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
    fontSize: 16,
  },
});

export default Register;
