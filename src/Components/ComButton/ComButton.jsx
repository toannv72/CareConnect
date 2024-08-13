import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { colors } from "../../styles/Styles";

export default function ComButton({
  children,
  onPress,
  check,
  style,
  disable,
  warning,
}) {
  // Đặt màu dựa trên giá trị của warning
  const buttonColor = warning ? "red" : colors.primary;
  const buttonTextColor = warning ? "#fff" : "#fff"; // Màu chữ có thể giữ như cũ hoặc thay đổi nếu cần

  return (
    <>
      {check ? (
        <TouchableOpacity
          style={[
            styles.button,
            { borderColor: buttonColor, backgroundColor: "#fff" },
            style,
          ]}
          onPress={onPress}
        >
          <Text style={[styles.buttonText, { color: buttonColor }]}>
            {children}
          </Text>
        </TouchableOpacity>
      ) : (
        <>
          {disable ? (
            <TouchableOpacity
              style={[
                styles.buttonDisable,
                { borderColor: buttonColor, backgroundColor: buttonColor },
              ]}
            >
              <Text style={[styles.buttonTextCheck, { color: "#fff" }]}>
                {children}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                styles.buttonCheck,
                { backgroundColor: buttonColor, borderColor: buttonColor },
                style,
              ]}
              onPress={onPress}
            >
              <Text
                style={[styles.buttonTextCheck, { color: buttonTextColor }]}
              >
                {children}
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1, // Đảm bảo rằng borderWidth được định nghĩa
    elevation: 5, // Bóng đổ cho Android
    shadowColor: "#000", // Màu của bóng đổ cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginHorizontal: 5,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  buttonCheck: {
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1, // Đảm bảo rằng borderWidth được định nghĩa
    elevation: 5, // Bóng đổ cho Android
    shadowColor: "#000", // Màu của bóng đổ cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginHorizontal: 5,
  },
  buttonTextCheck: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  buttonDisable: {
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 15,
    borderWidth: 1, // Đảm bảo rằng borderWidth được định nghĩa
    borderRadius: 10,
    opacity: 0.5,
    paddingHorizontal: 20,
  },
});
