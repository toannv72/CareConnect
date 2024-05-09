import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function ComInputCode({ getCode }) {

  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");
  const [code4, setCode4] = useState("");
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);

  useEffect(() => {
    getCode(code1 + code2 + code3 + code4);
  }, [code1, code2, code3, code4]);
  const handleTextInputChange = (
    text,
    ref,
    setCode,
    nextInputRef,
    prevInputRef
  ) => {
    if (/^\d*$/.test(text)) {
      setCode(text);
      if (text.length === 0 && prevInputRef && prevInputRef.current) {
        // prevInputRef.current.focus();
      } else if (text.length === 1 && nextInputRef && nextInputRef.current) {
        nextInputRef.current.focus();
      }
    }
  };

  const handleBackspacePress = (ref, prevInputRef, setCode) => {
    if (
      ref.current?._internalFiberInstanceHandleDEV?.memoizedProps?.value === ""
    ) {
      if (prevInputRef && prevInputRef.current) {
        prevInputRef.current.focus();
        setCode("");
      }
    }
  };

  return (
    <View>
      <View style={styles.codeContainer}>
        <TextInput
          ref={input1Ref}
          underlineColorAndroid="transparent"
          keyboardType="numeric"
          style={styles.codeInput}
          onChangeText={(text) =>
            handleTextInputChange(text, input1Ref, setCode1, input2Ref, null)
          }
          value={code1}
          maxLength={1}
        />
        <TextInput
          ref={input2Ref}
          underlineColorAndroid="transparent"
          keyboardType="numeric"
          style={styles.codeInput}
          onChangeText={(text) =>
            handleTextInputChange(
              text,
              input2Ref,
              setCode2,
              input3Ref,
              input1Ref
            )
          }
          value={code2}
          maxLength={1}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace") {
              handleBackspacePress(input2Ref, input1Ref, setCode1);
            }
          }}
        />
        <TextInput
          ref={input3Ref}
          underlineColorAndroid="transparent"
          keyboardType="numeric"
          style={styles.codeInput}
          onChangeText={(text) =>
            handleTextInputChange(
              text,
              input3Ref,
              setCode3,
              input4Ref,
              input2Ref
            )
          }
          value={code3}
          maxLength={1}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace") {
              handleBackspacePress(input3Ref, input2Ref, setCode2);
            }
          }}
        />
        <TextInput
          ref={input4Ref}
          underlineColorAndroid="transparent"
          keyboardType="numeric"
          style={styles.codeInput}
          onChangeText={(text) =>
            handleTextInputChange(text, input4Ref, setCode4, null, input3Ref)
          }
          value={code4}
          maxLength={1}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace") {
              handleBackspacePress(input4Ref, input3Ref, setCode3);
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 16,
  },
  codeContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  codeInput: {
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    height: 54,
    width: 54,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    textAlign: "center",
    marginHorizontal: 5,
  },
});
