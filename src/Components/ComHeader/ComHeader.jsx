import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import backArrowBlack from "../../../assets/icon/backArrowBlack.png";
import { useNavigation } from '@react-navigation/native';

const ComHeader = ({ showBackIcon = false, showTitle = false, title = "", backgroundColor = "white" }) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {showBackIcon && (
        <TouchableOpacity onPress={handleBackPress} style={styles.backIconContainer}>
          <Image
            source={backArrowBlack}
            style={styles.backIcon}
          />
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 35,
    padding: 15,
    justifyContent: 'center',
    position: 'relative',
  },
  backIconContainer: {
    marginRight: 10,
    position: 'absolute',
    left: 15,
    paddingTop: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 40,
    marginRight: 40,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ComHeader;
