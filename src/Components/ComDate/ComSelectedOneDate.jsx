import React, { useState } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import LocaleConfig from "../../configs/LocalizationConfig";
import { Controller } from "react-hook-form";


export default function ComSelectedOneDate({
  date,
  label,
  name,
  control,
  rules,
  required,
  errors,
  placeholder,
  enabled, // Bỏ qua placeholder vì không cần thiết
  ...props }) {
  const today = moment().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(today);
  const errorMessage = errors[name]?.message;
  
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
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <View>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={selectedDate ? { [selectedDate]: { selected: true, selectedColor: '#33B39C' } } : {}}
            minDate={today} // Chặn ngày quá khứ
            hideExtraDays={true}
            {...LocaleConfig}
          />
        </View>
      )
      }
    />
  );
}
