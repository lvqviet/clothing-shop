import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Keyboard,
} from "react-native";
import React from "react";
import { Header, Input, Button, CustomText } from "../components";

const Account = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    fullname: "Test Lee",
    phone: "0999123456",
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        showBackButton={true}
        navigation={navigation}
        title='My Account'
        showCartIcon={false}
      />
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
              value='test123@gmail.com'
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
    marginTop: 45,
    flex: 1,
  },
  changePassword: {
    color: Color.black,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "right",
    fontSize: 16,
  },
});
