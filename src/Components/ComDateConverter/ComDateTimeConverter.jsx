import React from "react";
import { Text } from "react-native";
import moment from "moment";

const ComDateTimeConverter = (dateTime) => {
    const date = new Date(dateTime);
    date.setHours(date.getHours() + 7); // Chuyển đổi sang giờ Việt Nam (UTC+7)
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes} - ${day}/${month}/${year}`;
};

export default ComDateTimeConverter;