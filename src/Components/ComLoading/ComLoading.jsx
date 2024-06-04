import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

export default function ComLoading({ children, show }) {
  return (
    <>
      {show ? (
        <View style={{
          flex: 1,
          justifyContent: 'center'
        }}>
          <LottieView
            source={require('./loading.json')}
            style={{height: 200 }}
            autoPlay
            loop
          />
          <View style={{height: 100}}></View>

        </View>
      ) : (
        <View>{children}</View>
      )}
    </>
  );
}
