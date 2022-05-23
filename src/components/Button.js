import React from "react";
import { TouchableOpacity } from "react-native";
import Color from "../constants/Color";
import CustomText from "./CustomText";

const Button = ({ title, color, onPress = () => {} }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 55,
        width: "100%",
        backgroundColor: color ? color : Color.purple717fe0,
        marginVertical: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
      }}
    >
      <CustomText
        style={{ color: Color.white, fontWeight: "bold", fontSize: 18 }}
        text={title}
      />
    </TouchableOpacity>
  );
};

export default Button;
