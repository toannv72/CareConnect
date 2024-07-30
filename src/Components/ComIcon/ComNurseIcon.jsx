import React, { useState } from "react";
import { Image, View } from "react-native";
import Nav1 from "../../../assets/icon/Nav1_1.png";
import Nav2 from "../../../assets/images/Nurse/NurseHomeIcon/NavNurse2_1.png";
import Nav4 from "../../../assets/icon/Nav4_1.png";
import Nav4_1_1 from "../../../assets/icon/Nav4_1_1.png";
import Nav4_1_2 from "../../../assets/icon/Nav4_1_2.png";
import Nav5 from "../../../assets/icon/Nav5_1.png";

import Nav1_1 from "../../../assets/icon/Nav1_2.png";
import Nav2_1 from "../../../assets/images/Nurse/NurseHomeIcon/NavNurse2_2.png";
import Nav4_1 from "../../../assets/icon/Nav4_2.png";
import Nav5_1 from "../../../assets/icon/Nav5_2.png";
import { useEffect } from "react";

const iconMap = {
  Nav1: Nav1_1,
  Nav2: Nav2_1,
  Nav4: Nav4_1,
  Nav5: Nav5_1,
  Nav1_1: Nav1,
  Nav2_1: Nav2,
  Nav4_1: Nav4,
  Nav4_1_1: Nav4_1_1, //icon có thông báo chưa đọc
  Nav4_1_2: Nav4_1_2,
  Nav5_1: Nav5,
};

const ComIcon = React.memo(({ icon }) => {
  const navBar = iconMap[icon] || null; 

  return (
    <View>
      <Image
        // source={{ uri: "asset:/icon/Nav5_2.png" }}
        source={navBar}
        style={{
          width: 80,
          height: 60,
          objectFit: "fill",
          resizeMode: "contain",
        }}
      />
    </View>
  );
});

export default ComIcon;
