import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import TopicContent from "../../page/Home/TopicContent";
import { LanguageContext } from "../../contexts/LanguageContext";

export default function ComSelectButton({ children, onPress, check, disable }) {
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
        <>
          {disable ? (
            <TouchableOpacity style={[styles.buttonDisable, {}]}>
              <Text style={styles.buttonText1}>{children}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.button1, {}]} onPress={onPress}>
              <Text style={styles.buttonText1}>{children}</Text>
            </TouchableOpacity>
          )
          }
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    // width: 100,
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
    marginBottom: 20,
    backgroundColor: "#33B39C",
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#33B39C",
    borderRadius: 10,
    // width: 100,
    paddingHorizontal: 20,
  },
  buttonDisable: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#33B39C",
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#33B39C",
    borderRadius: 10,
    opacity: 0.5,
    paddingHorizontal: 20,
  },
  buttonText1: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
    textAlign: "center",
  },
});
