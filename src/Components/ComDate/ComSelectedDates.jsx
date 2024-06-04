import React, { useState } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
export default function ComSelectedDates() {
  const [selectedDates, setSelectedDates] = useState({});
  const today = moment().format("YYYY-MM-DD");

  // chọn được ngày quá khứ
  // const handleDayPress = (day) => {
  //   const updatedDates = { ...selectedDates };
  //   if (updatedDates[day.dateString]) {
  //     delete updatedDates[day.dateString];
  //   } else {
  //     updatedDates[day.dateString] = { selected: true };
  //   }
  //   setSelectedDates(updatedDates);
  // };
  const handleDayPress = (day) => {
    const selectedDate = moment(day.dateString);
    const now = moment();
    // Kiểm tra xem ngày đã chọn có phải là ngày hôm nay hoặc ngày quá khứ không
    if (selectedDate.isSameOrBefore(now, "day")) {
      // Nếu ngày đã chọn là hôm nay hoặc quá khứ, không thêm vào danh sách chọn
      return;
    }
    const updatedDates = { ...selectedDates };
    if (updatedDates[day.dateString]) {
      delete updatedDates[day.dateString];
    } else {
      updatedDates[day.dateString] = { selected: true };
    }
    setSelectedDates(updatedDates);
  };
  return (
    <View>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={selectedDates}
        minDate={today} // Chặn ngày quá khứ
        hideExtraDays={true}
      />
    </View>
  );
}
