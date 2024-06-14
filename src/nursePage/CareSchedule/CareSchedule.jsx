import { useState, useEffect, useRef, useContext } from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComSchedule from "./ComSchedule";
import { Calendar } from "react-native-calendars";
import { date } from "yup";
import moment from "moment";
import noTask from "../../../assets/images/Nurse/CareSchedule/noTask.png"
import { useNavigation } from '@react-navigation/native';
import LocaleConfig from "../../configs/LocalizationConfig";

export default function CareSchedule({ }) {
    const today = moment().format("YYYY-MM-DD");
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
    const {
        text: {
            CareSchedule,
            common: { button },
        },
        setLanguage,
    } = useContext(LanguageContext);

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
            roomId: 102,
            areaId: "A",
            time: "06/:00 - 14:00",
            date: "2024-06-22"
        },
        {
            id: 1,
            staffId: 123,
            nurseID: 234,
            roomId: 103,
            areaId: "A",
            time: "06/:00 - 14:00",
            date: "2024-06-22"
        },
        {
            id: 1,
            staffId: 123,
            nurseID: 234,
            roomId: 104,
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

    const [markedDates, setMarkedDates] = useState({
        [today]: { selected: true }
    });

    useEffect(() => {
        // Cập nhật markedDates mỗi khi selectedDate thay đổi
        setMarkedDates(data.reduce((acc, item) => {
            acc[item.date] = { dots: [{ key: 'task', color: 'red' }], selected: item.date === selectedDate };
            return acc;
        }, { [selectedDate]: { selected: true } }));
    }, [selectedDate, data]);

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
                    style={{ marginHorizontal: 15, marginBottom: 5 }}
                    onDayPress={onDayPress}
                    {...LocaleConfig}
                />
                {filteredData.length > 0 ? (//if has data => display list òf task
                    <>
                        <Text style={[styles.dateTitle, styles.taskContainer]}>
                        {moment(selectedDate).format('DD/MM/YYYY')}
                        </Text>
                        <ScrollView>
                            {filteredData.map((item, index) => (
                                <ComSchedule
                                    key={index}
                                    data={item}
                                    onPress={() => navigation.navigate("NurseHealthMonitor", { roomData: item })}
                                />
                            ))}
                            <View style={{ height: 100 }} />
                        </ScrollView>
                    </>
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
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'white',
        paddingTop: 10
    },
    dateTitle: {
        fontWeight: "600",
        fontSize: 16,
        textAlign: "center",
    }
})