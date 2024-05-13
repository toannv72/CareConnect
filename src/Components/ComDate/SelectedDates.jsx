import React, { useState } from 'react'
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function SelectedDates() {
  const [selectedDates, setSelectedDates] = useState({});
  console.log("====================================");
  console.log(selectedDates);
  console.log("====================================");
  const handleDayPress = (day) => {
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
      <Calendar onDayPress={handleDayPress} markedDates={selectedDates} />
    </View>
  );
};

