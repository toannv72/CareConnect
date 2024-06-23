import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native";
import { colors  } from '../../styles/Styles';

export default function ComButton({ children, onPress, check,  style  }) {
  return (
    <>
      {check ? (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
          <Text style={styles.buttonText}>{children}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[styles.buttonCheck, style]} onPress={onPress}>
          <Text style={styles.buttonTextCheck}>{children}</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5, // Bóng đổ cho Android
    shadowColor: "#000", // Màu của bóng đổ cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderColor:  colors.primary,
    borderWidth: 1,
  },
  buttonText: {
    color:  colors.primary,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },

  buttonCheck: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5, // Bóng đổ cho Android
    shadowColor: "#000", // Màu của bóng đổ cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonTextCheck: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
