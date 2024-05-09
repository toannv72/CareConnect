import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";

export default function ComTitleLink({ children, style, to, id }) {
  const navigation = useNavigation();
  const goTo = () => {
   if (id) {
       navigation.navigate(to, id);

   } else {
     navigation.navigate(to);
   }
  };
  return (
    <TouchableOpacity onPress={() => goTo()} style={styles.view}>
      <Text style={[styles.text, { ...style }]}>{children}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: "#000",
    fontWeight: "bold",
  },
  view: {
    padding: 0,
    backgroundColor: "#fff",
  },
});
