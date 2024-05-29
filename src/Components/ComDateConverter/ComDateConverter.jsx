import React from "react";
import { Text } from "react-native";
import moment from "moment";

export default ComDateConverter = ({ children }) => {
  const formattedDate = moment(children, "YYYY-MM-DD").format("DD/MM/YYYY");
  return <Text>{formattedDate}</Text>;
};
