import React from "react";
import { Keyboard, SafeAreaView, StyleSheet, View, Image } from "react-native";
import { useSelector } from "react-redux";
import {
  Button,
  CustomText,
  Header,
  Input,
  Loader,
  ModalUploadImage,
} from "../components";
import { Feather, Ionicons } from "@expo/vector-icons";
import Color from "../constants/Color";
import { useState } from "react";
import { uploadAvatar } from "../api/uploadImage";

const Account = ({ navigation }) => {
  const { email, userName, fullName } = useSelector((state) => state.user);

  const [inputs, setInputs] = useState({
    fullname: fullName,
    phone: "0999123456",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.fullname) {
      handleError("Please input fullname", "fullname");
      isValid = false;
    }

    if (!inputs.phone) {
      handleError("Please input phone number", "phone");
      isValid = false;
    }

    if (isValid) {
      update();
    }
  };

  const update = () => {
    console.log(inputs);
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const updateAvatar = async (image) => {
    setLoading(true);
    try {
      const response = await uploadAvatar(image);
      setLoading(false);
      if (response.ok && response.data) {
        setAvatar(response.data.data.link);
      } else {
        console.log(response.config);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Loader visible={loading} />
      <Header
        showBackButton={true}
        navigation={navigation}
        title='My Account'
        showCartIcon={false}
      />

      <ModalUploadImage onConfirm={updateAvatar}>
        <View style={styles.containerAvatar}>
          <Image
            resizeMode='cover'
            source={
              avatar != ""
                ? { uri: avatar }
                : require("../../assets/product.jpg")
            }
            style={styles.avatar}
          />
          <Feather
            name='edit'
            size={24}
            color={Color.purple717fe0}
            style={styles.editIcon}
          />
        </View>
      </ModalUploadImage>

      <View style={styles.container}>
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
              iconName='email-outline'
              label='Email'
              value={email}
              editable={false}
            />

            <Input
              iconName='account-outline'
              label='User Name'
              value={userName}
              editable={false}
            />

            <Input
              onChangeText={(text) => handleOnchange(text, "fullname")}
              onFocus={() => handleError(null, "fullname")}
              iconName='account-outline'
              label='Full Name'
              placeholder='Enter your full name'
              error={errors.fullname}
              value={inputs.fullname}
            />

            <Input
              keyboardType='numeric'
              onChangeText={(text) => handleOnchange(text, "phone")}
              onFocus={() => handleError(null, "phone")}
              iconName='phone-outline'
              label='Phone Number'
              placeholder='Enter your phone number'
              error={errors.phone}
              value={inputs.phone}
            />

            <CustomText
              text='Change Password'
              style={styles.changePassword}
              onPress={() => {}}
            />
          </View>
          <Button title='Update' onPress={validate} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  changePassword: {
    color: Color.black,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "right",
    fontSize: 16,
  },
  containerAvatar: {
    marginTop: 45,
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
