import React, { useState } from "react";
import { Image, View } from "react-native";
import Nav1 from "../../../assets/icon/Nav1.png";
import Nav2 from "../../../assets/icon/Nav2.png";
import Nav3 from "../../../assets/icon/Nav3.png";
import Nav4 from "../../../assets/icon/Nav4.png";
import Nav5 from "../../../assets/icon/Nav5.png";
import { useEffect } from "react";

export default function ComIcon({ icon }) {
    const [navBar, setNavBar] = useState(null);
    
  useEffect(() => {
    let bar;
    switch (icon) {
      case "Nav1":
          setNavBar(Nav1);
        break;
      case "Nav2":
          setNavBar(Nav2);
        break;
      case "Nav3":
          setNavBar(Nav3);
        break;
      case "Nav4":
          setNavBar(Nav4);
        break;
      case "Nav5":
          setNavBar(Nav5);
        break;

      default:
        break;
    }
    return () => {
      setNavBar(bar);
    };
  }, []);
  return (
    <View>
      <Image source={navBar} />
    </View>
  );
}
