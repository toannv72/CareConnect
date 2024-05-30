import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import backArrowBlack from "../../../assets/icon/backArrowBlack.png";
import { useNavigation } from "@react-navigation/native";

const ComHeader = ({
  showBackIcon = false,
  showTitle = false,
  title = "",
  backgroundColor = "white",
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Homes");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {showBackIcon && (
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.backIconContainer}
        >
          <Image source={backArrowBlack} style={styles.backIcon} />
        </TouchableOpacity>
      )}
      {showTitle && (
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // alignItems: "center",
    paddingTop: 55,
    paddingBottom: 5,
    // justifyContent: "center",
    // position: "relative",
  },
  backIconContainer: {
    position: "absolute",
    left: 5,
    bottom: -15,
    paddingVertical: 20,
    paddingRight: 20,
    paddingLeft: 10,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    marginLeft: 40,
    marginRight: 40,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ComHeader;
