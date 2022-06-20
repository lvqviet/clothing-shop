import React from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Alert,
} from "react-native";
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
import { userApi } from "../api";
import Regex from "../constants/Regex";
import { useDispatch } from "react-redux";
import { actions } from "../redux";

const Account = ({ navigation }) => {
  const { email, userName, fullName, avatar, contact, address, id } =
    useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    fullname: fullName,
    phone: contact,
    address,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(avatar);

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
    } else if (!inputs.phone.match(Regex.vietnamesePhoneNumber)) {
      handleError("Please input a valid phone number", "phone");
      isValid = false;
    }

    if (!inputs.address) {
      handleError("Please input address", "address");
      isValid = false;
    }

    if (isValid) {
      updateInfo();
    }
  };

  const updateInfo = async (avatarUrl) => {
    try {
      setLoading(true);

      const response = await userApi.update(id, {
        fullname: inputs.fullname.trim(),
        contact: inputs.phone.trim(),
        address: inputs.address.trim(),
        avatar: avatarUrl ?? avatar,
      });
      setLoading(false);
      if (response.ok) {
        dispatch(
          actions.user.update_info({
            fullName: inputs.fullname.trim(),
            contact: inputs.phone.trim(),
            address: inputs.address.trim(),
            avatar: avatarUrl ?? avatar,
          })
        );
        Alert.alert("Update successfully");
      } else {
        Alert.alert("An error occurred");
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

  const updateAvatar = async (image) => {
    setLoading(true);
    try {
      const response = await uploadAvatar(image);
      setLoading(false);
      if (response.ok && response.data) {
        setAvatarUrl(response.data.data.link);
        await updateInfo(response.data.data.link);
      } else {
        console.log("An error occurred");
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

      <ScrollView style={styles.container}>
        <ModalUploadImage onConfirm={updateAvatar}>
          <View style={styles.containerAvatar}>
            <Image
              resizeMode='cover'
              source={
                avatarUrl != ""
                  ? { uri: avatarUrl }
                  : require("../../assets/icon.png")
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

            <Input
              onChangeText={(text) => handleOnchange(text, "address")}
              onFocus={() => handleError(null, "address")}
              iconName='home-outline'
              label='Address'
              placeholder='Enter your address'
              error={errors.address}
              value={inputs.address}
            />

            <CustomText
              text='Change Password'
              style={styles.changePassword}
              onPress={() => {}}
            />
          </View>
          <Button title='Update' onPress={validate} />
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
