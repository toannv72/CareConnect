import React, { useState } from "react";
import { Image, View } from "react-native";
import Nav1 from "../../../assets/icon/Nav1_1.png";
import Nav2 from "../../../assets/icon/Nav2_1.png";
import Nav3 from "../../../assets/icon/Nav3_1.png";
import Nav4 from "../../../assets/icon/Nav4_1.png";
import Nav5 from "../../../assets/icon/Nav5_1.png";

import Nav1_1 from "../../../assets/icon/Nav1_2.png";
import Nav2_1 from "../../../assets/icon/Nav2_2.png";
import Nav3_1 from "../../../assets/icon/Nav3_2.png";
import Nav4_1 from "../../../assets/icon/Nav4_2.png";
import Nav5_1 from "../../../assets/icon/Nav5_2.png";

const iconMap = {
  Nav1,
  Nav2,
  Nav3,
  Nav4,
  Nav5,
  Nav1_1,
  Nav2_1,
  Nav3_1,
  Nav4_1,
  Nav5_1,
};

export default function ComIcon({ icon }) {
  const [navBar, setNavBar] = useState(null);

  useEffect(() => {
    if (iconMap[icon]) {
      setNavBar(iconMap[icon]);
    } else {
      setNavBar(null);
    }
  }, [icon]);

  return (
    <View>
      {navBar && (
        <Image
          source={{ uri: navBar }}
          style={{ width: 80, height: 60, resizeMode: "contain" }}
        />
      )}
    </View>
  );
}
