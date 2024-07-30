import React from "react";
import { Image, View } from "react-native";
import Nav1 from "../../../assets/icon/Nav1_1.png";
import Nav2 from "../../../assets/icon/Nav2_1.png";
import Nav3 from "../../../assets/icon/Nav3_1.png";
import Nav4 from "../../../assets/icon/Nav4_1.png";
import Nav4_1_1 from "../../../assets/icon/Nav4_1_1.png";
import Nav4_1_2 from "../../../assets/icon/Nav4_1_2.png";
import Nav5 from "../../../assets/icon/Nav5_1.png";

import Nav1_1 from "../../../assets/icon/Nav1_2.png";
import Nav2_1 from "../../../assets/icon/Nav2_2.png";
import Nav3_1 from "../../../assets/icon/Nav3_2.png";
import Nav4_1 from "../../../assets/icon/Nav4_2.png";
import Nav5_1 from "../../../assets/icon/Nav5_2.png";

const iconMap = {
  Nav1: Nav1_1,
  Nav2: Nav2_1,
  Nav3: Nav3_1,
  Nav4: Nav4_1,
  Nav5: Nav5_1,
  Nav1_1: Nav1,
  Nav2_1: Nav2,
  Nav3_1: Nav3,
  Nav4_1: Nav4,
  Nav4_1_1: Nav4_1_1, //icon có thông báo chưa đọc
  Nav4_1_2: Nav4_1_2,
  Nav5_1: Nav5,
};

const ComIcon = React.memo(({ icon }) => {
  const navBar = iconMap[icon] || null; // Default to null if the icon is not found

  return (
    <View>
      <Image
        source={navBar}
        style={{ width: 80, height: 60, objectFit: "fill" }}
      />
    </View>
  );
});

export default ComIcon;
