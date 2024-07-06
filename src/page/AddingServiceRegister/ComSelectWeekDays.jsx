import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";

export default function ComSelectWeekDays({ children, onPress, check, disable }) {
  const {
    text: { Home },
  } = useContext(LanguageContext);
  return (
    <View>
      {check ? (
        <TouchableOpacity
          style={[styles.button, disable ? styles.disabledButton : null]}
          onPress={onPress}
          disabled={disable}>
          <Text style={[styles.buttonText, disable ? styles.disabledText : null]}>{children}</Text>
        </TouchableOpacity>
      ) : (
        // outline
        <TouchableOpacity
          style={[styles.button1, disable ? styles.disabledOutlineButton : null]}
          disabled={disable}
          onPress={onPress}>
          <Text style={[styles.buttonText1, disable ? styles.disabledOutlineText : null]}>{children}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
  },
  buttonText: {
    color: "#33B39C",
    fontWeight: "500",
    fontSize: 16,
    textAlign: "center",
  },
  button1: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#33B39C",
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#33B39C",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  buttonText1: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
    textAlign: "center",
  },
  disabledButton: {
    opacity: 0.5, // Adjust opacity to visually indicate disabled state
    borderColor: "#D3D3D3",
  },
  disabledOutlineButton: {
    borderColor: "#D3D3D3",
  },
  disabledText: {
    color: "#A9A9A9",
  },
  disabledOutlineText: {
    color: "#D3D3D3",
  },
});
