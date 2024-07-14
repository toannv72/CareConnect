import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import backArrowBlack from "../../../assets/icon/backArrowBlack.png";
import { useNavigation, useRoute } from "@react-navigation/native";

const ComHeader = ({
  showBackIcon = false,
  showTitle = false,
  title = "",
  backgroundColor = "white",
}) => {
  const navigation = useNavigation();
  const route = useRoute();

  const handleBackPress = () => {
    if (route.name === 'EditProfile' || !navigation.canGoBack()) {
      navigation.navigate("Homes");
    }
    else if (route.name === 'BillHistory' || !navigation.canGoBack()) {
      navigation.navigate("Account");
    }
     else {
      navigation.goBack();
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
          <Text style={styles.titleText} numberOfLines={2}>{title}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 55,
    paddingBottom: 5,
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
    width: 27,
    height: 27,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    marginLeft: 50,
    marginRight: 40,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ComHeader;
