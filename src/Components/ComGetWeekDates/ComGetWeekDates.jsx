import React from 'react';

export const ComGetWeekDates = () => {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
    console.log("startOfWeek initial:", startOfWeek.toISOString());
    const weekDates = {};

    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);

        // Chuyển đổi ngày thành ngày theo múi giờ Việt Nam (GMT+7)
        const options = { timeZone: 'Asia/Ho_Chi_Minh', weekday: 'long' };
        const dayName = date.toLocaleDateString('en-US', options);
        const formattedDate = date.toLocaleDateString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }).split('T')[0];

        weekDates[dayName] = formattedDate;
    }

    return weekDates;
};

export default ComGetWeekDates;
