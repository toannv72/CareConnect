import React, { useState } from "react";
import { Modal, View, Text, Image, StyleSheet } from "react-native";
import ComSelectButton from "../ComButton/ComSelectButton";

export default ComPopup = ({
  visible,
  title,
  image,
  buttons,
  onClose,
  children,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {title && <Text style={styles.title}>{title}</Text>}
          {image && <Image source={image} style={styles.image} />}
          <View style={styles.contentContainer}>
            {React.Children.map(children, (child) => (
              <View style={styles.childContainer}>{child}</View>
            ))}
          </View>
          {buttons && (
            <View style={styles.buttonContainer}>
              {buttons.map((button, index) => (
                <ComSelectButton
                  key={index}
                  onPress={button.onPress}
                  check={button.check}
                >
                  <Text>{button.text}</Text>
                </ComSelectButton>
              ))}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },
  contentContainer: {
    width: "100%",
    marginBottom: 15,
  },
  childContainer: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "lightblue",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
