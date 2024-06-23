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
  enabled, // Bỏ qua placeholder vì không cần thiết
  ...props }) {
  const today = moment().format("YYYY-MM-DD");
  console.log("children ", today)

  const [selectedDate, setSelectedDate] = useState(today);
  const errorMessage = errors[name]?.message;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => setOpen(false);

  const handleDayPress = (day) => {
    const selectedDateMoment = moment(day.dateString);
    const now = moment();

    if (selectedDateMoment.isSameOrBefore(now, "day")) {
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
        name="dateOfBirth"
        defaultValue={today}
        render={({ field: { onChange, value } }) => (
          <View>
            <TouchableOpacity onPress={enabled ? handleOpen : null} activeOpacity={1}>
              <View
                style={[
                  styles.input,
                  { borderColor: errorMessage ? "red" : "#33B39C" }, // Đổi màu viền khi có lỗi
                ]}
              >
                <Text>{<ComDateConverter>{value || today}</ComDateConverter>}</Text>
                {/* <Text>{formattedDate(value || date)}</Text> */}
              </View>
            </TouchableOpacity>
            {open && (//Trích xuất thuộc tính field và các thuộc tính onChange và value của field từ đối tượng được trả về bởi Controller
              <ComPopup
              visible={open}>
                <Calendar
                  {...LocaleConfig}
                  onDayPress={(day) => {
                    onChange(day.dateString);  // Gọi onChange để cập nhật giá trị của dateOfBirth
                    handleClose();

                  }}
                  markedDates={{
                    [value]: {        // value: Giá trị hiện tại của trường dữ liệu.
                      selected: true,
                      selectedColor: '#33B39C'
                    }
                  }}
                />
              </ComPopup>
            )}
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

