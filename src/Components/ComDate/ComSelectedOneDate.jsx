import React, { useState } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
export default function ComSelectedOneDate({ date }) {
  const [selectedDate, setSelectedDate] = useState({});
  const today = moment().format("YYYY-MM-DD");

  const handleDayPress = (day) => {
    const selectedDateMoment = moment(day.dateString);
    const now = moment();

    if (selectedDateMoment.isSameOrBefore(now, "day")) {
      return; // Không cho chọn ngày quá khứ
    }

    // Nếu đã có ngày được chọn, bỏ chọn ngày đó
    if (selectedDate && selectedDate === day.dateString) {
      setSelectedDate(null);
      date(null);
    } else {
      setSelectedDate(day.dateString); // Chỉ chọn ngày mới
      date(day.dateString);
    }
  };

  return (
    <View>
      <Calendar
        onDayPress={handleDayPress}
        // markedDates={selectedDates}
        markedDates={selectedDate ? { [selectedDate]: { selected: true } } : {}}
        minDate={today} // Chặn ngày quá khứ
        hideExtraDays={true}
      />
    </View>
  );
}
