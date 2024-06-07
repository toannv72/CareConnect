import { useState, useEffect, useRef, useContext } from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComSchedule from "./ComSchedule";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { date } from "yup";
import moment from "moment";
import noTask from "../../../assets/Nurse/CareSchedule/noTask.png"

export default function CareSchedule({ }) {
    const today = moment().format("YYYY-MM-DD");
    const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
    const {
        text: {
            CareSchedule,
            common: { button },
        },
        setLanguage,
    } = useContext(LanguageContext);

    LocaleConfig.locales['vi'] = {
        monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        monthNamesShort: ['Thg 1', 'Thg 2', 'Thg 3', 'Thg 4', 'Thg 5', 'Thg 6', 'Thg 7', 'Thg 8', 'Thg 9', 'Thg 10', 'Thg 11', 'Thg 12'],
        dayNames: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
        dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
        today: 'Hôm nay'
    };
    LocaleConfig.defaultLocale = 'vi';

    const [data, setData] = useState([
        {
            id: 1,
            staffId: 123,
            nurseID: 234,
            roomId: 101,
            areaId: "A",
            time: "06/:00 - 14:00",
            date: "2024-06-20"
        },
        {
            id: 1,
            staffId: 123,
            nurseID: 234,
            roomId: 101,
            areaId: "A",
            time: "06/:00 - 14:00",
            date: "2024-06-21"
        },
        {
            id: 1,
            staffId: 123,
            nurseID: 234,
            roomId: 101,
            areaId: "A",
            time: "06/:00 - 14:00",
            date: "2024-06-22"
        },
        {
            id: 1,
            staffId: 123,
            nurseID: 234,
            roomId: 101,
            areaId: "A",
            time: "06/:00 - 14:00",
            date: "2024-06-22"
        },
        {
            id: 1,
            staffId: 123,
            nurseID: 234,
            roomId: 101,
            areaId: "A",
            time: "06/:00 - 14:00",
            date: "2024-06-22"
        },
        {
            id: 1,
            staffId: 123,
            nurseID: 234,
            roomId: 101,
            areaId: "A",
            time: "06/:00 - 14:00",
            date: "2024-06-22"
        },
        {
            id: 1,
            staffId: 123,
            nurseID: 234,
            roomId: 102,
            areaId: "A last",
            time: "06/:00 - 14:00",
            date: "2024-06-22"
        },
        {
            id: 1,
            staffId: 123,
            nurseID: 234,
            roomId: 102,
            areaId: "A",
            time: "06/:00 - 14:00",
            date: "2024-06-30"
        },
        {
            id: 1,
            staffId: 123,
            nurseID: 234,
            roomId: 102,
            areaId: "A",
            time: "06/:00 - 14:00",
            date: "2024-07-20"
        },
    ])

    const task = { key: 'task', color: 'red', selectedDotColor: 'blue' }; //style for dot

    const markedDates = data.reduce((acc, item) => { // dùng reduce duyệt qua từng thành phần trong mảng data
        acc[item?.date] = (item?.date === selectedDate) //nếu date của ptu hiện tại = selectedate
            ? { dots: [task], selected: true } //set selected của ptu = true, gắn dot => {"selectedate":{"dots": [[Object]],selected: true}}
            : { dots: [task] }; //date của ptu hiện tại != selectedate => chỉ gắn dot  {"selectedate":{"dots": [[Object]]}
        return acc;
    }, { [selectedDate]: { selected: true } }); //giá trị khởi tạo cho biến acc {"selectedate":{selected: true}}

    const filteredData = data.filter(item => item.date === selectedDate);//get list of object has date = selectedDate

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    return (
        <>
            <ComHeader
                title={CareSchedule?.title}
                showTitle
            />
            <View style={styles.body}>
                <Calendar
                    markingType={'multi-dot'}
                    markedDates={markedDates}
                    style={{ marginHorizontal: 15, marginVertical: 10 }}
                    onDayPress={onDayPress}
                />
                {filteredData.length > 0 ? (//if has data => display list òf task
                    <ScrollView style={styles.taskContainer}>
                        <Text style={styles.dateTitle}>
                            {moment(selectedDate).format('DD-MM-YYYY')}
                        </Text>
                        {filteredData.map((item, index) => (
                            <ComSchedule key={index} data={item} />
                        ))}
                        <View style={{ height: 100 }} />
                    </ScrollView>
                ) : ( //ìf no data => display no task component
                    <View style={[styles.taskContainer, { alignItems: "center" }]}>
                        <Text style={styles.dateTitle}>
                            {moment(selectedDate).format('DD-MM-YYYY')}
                        </Text>
                        <Image
                            source={noTask}
                            style={{
                                width: 140,
                                height: 140,
                                objectFit: "fill",
                                marginVertical: 10
                            }}
                        />
                        <Text style={{ fontWeight: "bold", marginBottom: 10, fontSize: 16 }}>{CareSchedule.noTask}</Text>
                        <Text style={{ color: "#7C7C7C" }}>{CareSchedule.takeRest}</Text>
                    </View>
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "#fff",
        marginBottom: 10
    },
    taskContainer: {
        borderColor: "#33B39C",
        borderWidth: 1,
        borderBottomWidth: 0,
        height: 240,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'white',
        paddingTop: 10
    },
    dateTitle: {
        fontWeight: "600",
        fontSize: 16,
        textAlign: "center",
        marginVertical: 5
    }
})