import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import LocaleConfig from "../../configs/LocalizationConfig";
import { Controller } from "react-hook-form";
import ComDateConverter from "../../Components/ComDateConverter/ComDateConverter";
import ComPopup from "../../Components/ComPopup/ComPopup";


export default function ComSelectedOneDate({
  date,
  label,
  name,
  control,
  rules,
  required,
  errors,
  placeholder,
  enabled,
  minDate,
  maxDate,
  ...props }) {
  const today = moment().format("YYYY-MM-DD");

  const [selectedDate, setSelectedDate] = useState(moment().add(1, 'day').format("YYYY-MM-DD"));

  const errorMessage = errors[name]?.message;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => setOpen(false);

  const handleDayPress = (day) => {
    const selectedDateMoment = moment(day.dateString);
    const now = moment();

    if (selectedDateMoment?.isSameOrBefore(now, "day")) {
      return; // Không cho chọn ngày quá khứ
    }
    // Nếu đã có ngày được chọn, bỏ chọn ngày đó
    if (selectedDate && selectedDate === day.dateString) {
      setSelectedDate(null);
      // date(null);
    } else {
      setSelectedDate(day.dateString); // Chỉ chọn ngày mới
      // date(day.dateString);
    }
  };

  const formattedDate = (dateValue) => {
    if (!dateValue || !(dateValue instanceof Date)) {
      return ""; // Return empty string for invalid dates
    }

    const day = dateValue.getDate().toString().padStart(2, "0");
    const month = (dateValue.getMonth() + 1).toString().padStart(2, "0");
    const year = dateValue.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.inputContainer}>
      {/* Hiển thị label nếu có */}
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {required && <Text style={styles.required}>*</Text>}
        </View>
      )}
      <Controller
        control={control}
        name="date"
        defaultValue={moment().add(1, 'day').format("YYYY-MM-DD")}
        render={({ field: { onChange, value } }) => (
          <View>
            <Calendar
              {...LocaleConfig}
              onDayPress={(day) => {
                onChange(day.dateString);// Gọi onChange để cập nhật giá trị của dateOfBirth
                // handleDayPress(day);  
              }}
              markedDates={{
                [value]: {        // value: Giá trị hiện tại của trường dữ liệu.
                  selected: true,
                  selectedColor: '#33B39C'
                }
              }}
              minDate={minDate ? minDate : today}
            />
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
          </View>
        )}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  inputContainer: {
    // marginBottom: 20,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  label: {
    fontWeight: "bold",
    marginRight: 4,
  },
  required: {
    color: "red",
    fontSize: 14,
  },
  input: {
    backgroundColor: "#fff",
    height: 50,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    fontWeight: "bold",
    justifyContent: "center",
    elevation: 5, // Bóng đổ cho Android
    shadowColor: "#000", // Màu của bóng đổ cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  error: {
    color: "red",
    marginTop: 4,
  },
});

