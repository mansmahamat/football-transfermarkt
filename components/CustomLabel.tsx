import React from "react";
import { Text, View } from "react-native";

const customLabel = (val: string) => {
  return (
    <View style={{ width: 70, marginLeft: 7 }}>
      <Text style={{ color: "white", fontWeight: "bold" }}>{val}</Text>
    </View>
  );
};

export default customLabel;
