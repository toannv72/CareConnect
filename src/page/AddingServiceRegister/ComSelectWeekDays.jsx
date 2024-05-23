import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";

export default function ComSelectWeekDays({ children, onPress, check }) {
  const {
    text: { Home },
  } = useContext(LanguageContext);
  return (
    <View>
      {check ? (
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{children}</Text>
        </TouchableOpacity>
      ) : (
        // outline
        <TouchableOpacity style={styles.button1} onPress={onPress}>
          <Text style={styles.buttonText1}>{children}</Text>
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
});
