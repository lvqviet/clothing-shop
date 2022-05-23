import React from "react";
import { Text } from "react-native";

export default function CustomText({ text, style, onPress = () => {} }) {
  return (
    <Text
      style={[
        {
          fontSize: 12,
          color: "#333",
          fontWeight: "400",
          fontFamily: "Poppins_400Regular",
        },
        style,
      ]}
      onPress={onPress ?? null}
    >
      {text}
    </Text>
  );
}
