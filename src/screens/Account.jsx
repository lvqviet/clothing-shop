import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { userApi } from "../api";
import { Button, Header, Input, Loader } from "../components";
import Color from "../constants/Color";

const Account = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

  const getProfile = async () => {
    try {
      setLoading(true);
      const response = await userApi.getProfile();
      setLoading(false);
      if (response.ok) {
        setUser(response.data);
        setInputs({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateInfo = async () => {
    try {
      setLoading(true);
      const response = await userApi.updateProfile({
        firstName: inputs.firstName ? inputs.firstName.trim() : user.firstName,
        lastName: inputs.lastName ? inputs.lastName.trim() : user.lastName,
      });
      setLoading(false);
      if (response.ok) {
        getProfile();
        Alert.alert("Cập nhật thành công");
      } else {
        Alert.alert("Có lỗi");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Loader visible={loading} />
      <Header
        showBackButton={true}
        navigation={navigation}
        title='Tài khoản của tôi'
        showCartIcon={false}
      />

      <ScrollView style={styles.container}>
        <View
          style={{
            marginVertical: 20,
            paddingHorizontal: 15,
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View>
            <Input
              onChangeText={(text) => handleOnchange(text, "firstName")}
              onFocus={() => handleError(null, "firstName")}
              iconName='account-outline'
              label='Họ'
              error={errors.firstName}
              value={inputs.firstName}
            />

            <Input
              onChangeText={(text) => handleOnchange(text, "lastName")}
              onFocus={() => handleError(null, "lastName")}
              iconName='account-outline'
              label='Tên'
              error={errors.lastName}
              value={inputs.lastName}
            />

            <Input
              iconName='email-outline'
              label='Email'
              value={user?.email ?? ""}
              editable={false}
            />
          </View>
          <Button title='Lưu' onPress={updateInfo} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    flex: 1,
  },
  changePassword: {
    color: Color.black,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "right",
    fontSize: 16,
    marginBottom: 30,
  },
  containerAvatar: {
    alignSelf: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  editIcon: {
    bottom: 0,
    position: "absolute",
    right: 0,
  },
});
