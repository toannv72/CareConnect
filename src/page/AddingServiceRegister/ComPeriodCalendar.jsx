import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import moment from "moment";
export default function ComPeriodCalendar() {
  const [markedDates, setMarkedDates] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const today = moment().format("YYYY-MM-DD");

  console.log("====================================");
  console.log(markedDates);
  console.log("====================================");

  const handleDayPress = (day) => {
    if (!startDate) {
      setStartDate(day.dateString);
      setMarkedDates({ [day.dateString]: { selected: true, startingDay: true, color: '#33B39C'} });
    } else if (!endDate) {
      setEndDate(day.dateString);
      setMarkedDates({ [day.dateString]: { selected: true, startingDay: true, color: '#33B39C' } });
    
      const newMarkedDates = { ...markedDates };
      let currentDate = moment(startDate);
      while (currentDate <= moment(endDate || day.dateString)) {
        newMarkedDates[currentDate.format('YYYY-MM-DD')] = {
          selected: true,
          color: '#33B39C',
          startingDay: currentDate.isSame(startDate),
          endingDay: currentDate.isSame(endDate || day.dateString),
        };
        currentDate.add(1, 'days');
      }
      setMarkedDates(newMarkedDates);
    } else {
      setStartDate(day.dateString);
      setEndDate(null);
      setMarkedDates({ [day.dateString]: { selected: true, startingDay: true, color: '#33B39C' } });
    }
  };

  return (
    <Calendar
      markedDates={markedDates}
      markingType={'period'}
      onDayPress={handleDayPress}
      minDate={today} 
    />
  );
};
