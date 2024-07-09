import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

const Calendar31Days = ({ selectedDates, setSelectedDates, disableDates, enableDates }) => {
    // Tạo mảng 31 ngày và thêm 4 ô trống vào cuối
    const days = [...Array.from({ length: 31 }, (_, i) => i + 1), '', '', '', ''];
    // Chia các ngày thành các hàng với 7 ngày mỗi hàng
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7));
    }

    const handleDayPress = (day) => {
        if (day === '') return; // Bỏ qua ô trống
        const currentMonth = moment().month() + 1; // Tháng hiện tại (1-based)
        const currentYear = moment().year(); // Năm hiện tại
        const dateString = `${currentYear}-${currentMonth < 10 ? `0${currentMonth}` : currentMonth}-${day < 10 ? `0${day}` : day}`; // Tạo chuỗi ngày
        // Kiểm tra tính hợp lệ của ngày
        if (!moment(dateString, "YYYY-MM-DD", true).isValid()) {
            return; // Ngày không hợp lệ, không thêm vào selectedDates
        }
        const updatedSelectedDates = [...selectedDates];
        const index = updatedSelectedDates.indexOf(dateString);
        if (index !== -1) {
            updatedSelectedDates.splice(index, 1);
        } else {
            updatedSelectedDates.push(dateString);
        }
        setSelectedDates(updatedSelectedDates);
    };

    const isSelected = (day) => {
        const currentMonth = moment().month() + 1; // Tháng hiện tại (1-based)
        const currentYear = moment().year(); // Năm hiện tại
        const dateString = `${currentYear}-${currentMonth < 10 ? `0${currentMonth}` : currentMonth}-${day < 10 ? `0${day}` : day}`;
        return selectedDates.includes(dateString);
    };

    const isDisabled = (day) => {
        if (day === '') return false;
        const dayOfMonth = day;
        // Nếu có enableDates, ưu tiên kiểm tra trước
        if (enableDates?.length > 0) {
            return !enableDates.includes(dayOfMonth);
        } else if (disableDates?.length > 0) { // Nếu không có enableDates, mới kiểm tra disableDates
            return disableDates.includes(dayOfMonth);
        }
        return false; // Mặc định là không disable
    };

    const isEnabled = (day) => {
        if (day === '') return true;
        const dayOfMonth = day;
        // Nếu có enableDates, ưu tiên kiểm tra trước
        if (enableDates?.length > 0) {
            return enableDates.includes(dayOfMonth);
        } else if (disableDates?.length > 0) { // Nếu không có enableDates, mới kiểm tra disableDates
            return !disableDates.includes(dayOfMonth);
        }
        return true; // Mặc định là enabled
    };

    return (
        <View style={styles.calendarContainer}>
            {weeks.map((week, weekIndex) => (
                <View key={weekIndex} style={styles.weekRow}>
                    {week.map((day, dayIndex) => (
                        <TouchableOpacity
                            key={dayIndex}
                            style={[
                                styles.dayContainer,
                                isSelected(day) && styles.selectedDayContainer,
                                !isDisabled(day), 
                                isDisabled(day),]}
                            onPress={() => handleDayPress(day)}
                            disabled={!isEnabled(day) || isDisabled(day)} // Disable nếu không isEnabled hoặc là isDisabled
                        >
                            <Text
                                style={[
                                    styles.dayText,
                                    isSelected(day) && styles.selectedDayText,
                                    isDisabled(day) && styles.disabledDayText,
                                    isEnabled(day) ? styles.enabledDayText : styles.disabledDayText, // Thay đổi color dựa vào isEnabled
                                ]}
                            >{day}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    calendarContainer: {
        padding: 10,
        marginVertical: 30
    },
    weekRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    dayContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        margin: 2,
    },
    selectedDayContainer: {
        backgroundColor: '#33B39C',
    },
    dayText: {
        fontSize: 16,
    },
    selectedDayText: {
        color: '#fff',
    },
    disabledDayText: {
        color: '#bdbbbb',
    },
    enabledDayText: {
        color: '#333',
    },
});

export default Calendar31Days;
