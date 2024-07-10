import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";

const SelectedDates = ({ servicePackageDates, onDatesChange, disableHeader }) => {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    const calculateMarkedDates = () => {
      const startOfMonth = moment().startOf('month');
      const endOfMonth = moment().endOf('month');
      let currentDate = startOfMonth.clone();
      const tempMarkedDates = {};

      // Duyệt qua từng ngày trong tháng hiện tại
      while (currentDate.isSameOrBefore(endOfMonth, "day")) {
        let disable = true; // Mặc định disabled là true

        // Kiểm tra ngày hiện tại có trong servicePackageDates không
        servicePackageDates.forEach(item => {
          const { repetitionDay } = item;
          const dateToCheck = moment(currentDate).set("date", repetitionDay);
          const today = moment().date();
          // Nếu ngày hiện tại có day bằng repetitionDay
          if (dateToCheck.isSame(currentDate, "day") && repetitionDay !== today) {
            disable = false; // Nếu trùng, không disabled
          }
        });

        const dateString = currentDate.format("YYYY-MM-DD");
        tempMarkedDates[dateString] = { disabled: disable, disableTouchEvent: disable };
        currentDate.add(1, 'day'); // Tăng ngày để duyệt ngày tiếp theo
      }

      setMarkedDates(tempMarkedDates);
    };

    calculateMarkedDates();
  }, [servicePackageDates]);

  const handleDayPress = (day) => {
    const updatedSelectedDates = [...selectedDates];
    const dateString = day.dateString;

    // Kiểm tra xem ngày đã được chọn chưa
    if (selectedDates.includes(dateString)) {
      // Nếu đã chọn, loại bỏ khỏi danh sách selectedDates
      const filteredDates = selectedDates.filter(date => date !== dateString);
      setSelectedDates(filteredDates);
      onDatesChange(filteredDates);
    } else {
      // Nếu chưa chọn, thêm vào danh sách selectedDates
      updatedSelectedDates.push(dateString);
      setSelectedDates(updatedSelectedDates);
      onDatesChange(updatedSelectedDates);
    }
  };

  return (
    <View>
      <Calendar
       renderHeader={disableHeader ? (date) => null : undefined}
       renderArrow={disableHeader ? (direction) => null : undefined}
       hideDayNames={disableHeader ? true : false}
        onDayPress={handleDayPress}
        markedDates={{ ...markedDates, ...selectedDates.reduce((obj, date) => {
          obj[date] = { selected: true, selectedColor: '#33B39C'};
          return obj;
        }, {}) }}
        hideExtraDays={true}
      />
    </View>
  );
};

export default SelectedDates;
