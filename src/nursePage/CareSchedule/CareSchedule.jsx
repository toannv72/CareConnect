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
import { useAuth } from "../../../auth/useAuth";

export default function CareSchedule({ }) {
    const today = moment().format("YYYY-MM-DD");
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
    const { nurseSchedules } = useAuth();

    const {
        text: {
            CareSchedule,
            common: { button },
        },
        setLanguage,
    } = useContext(LanguageContext);

    const [markedDates, setMarkedDates] = useState({
        [today]: { selected: true }
    });

    useEffect(() => {
        // Cập nhật markedDates mỗi khi selectedDate thay đổi
        setMarkedDates(nurseSchedules?.reduce((acc, item) => {
            acc[item?.careSchedule?.date] = { dots: [{ key: 'task', color: 'red' }], selected: item?.careSchedule?.date === selectedDate };
            return acc;
        }, { [selectedDate]: { selected: true } }));
    }, [selectedDate, nurseSchedules]);

    const filteredData = nurseSchedules?.filter(item => item?.careSchedule?.date === selectedDate);//get list of object has date = selectedDate

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
                {filteredData?.length > 0 ? (//if has data => display list òf task
                    <View style={styles.taskContainer}>
                        <Text style={[styles.dateTitle]}>
                            {moment(selectedDate).format('DD/MM/YYYY')}
                        </Text>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        >
                                {filteredData?.map((item, index) => (
                                    <ComSchedule
                                        key={index}
                                        data={item}
                                        onPress={() => navigation.navigate("RoomDetail", { roomData: item?.careSchedule?.room })}
                                    />
                                ))}
                            <View style={{ height: 500}} />
                        </ScrollView>
                    </View>
                ) : ( //if no data => display no task component
                    <View style={[styles.taskContainer, { alignItems: "center" }]}>
                        <Text style={styles.dateTitle}>
                            {moment(selectedDate).format('DD/MM/YYYY')}
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
                        <Text style={{ fontWeight: "bold", marginBottom: 10, fontSize: 16 }}>{CareSchedule?.noTask}</Text>
                        <Text style={{ color: "#7C7C7C" }}>{CareSchedule?.takeRest}</Text>
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
    },
    taskContainer: {
        borderColor: "#33B39C",
        borderWidth: 1,
        borderBottomWidth: 0,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: "#fff",
        paddingTop: 10
    },
    dateTitle: {
        fontWeight: "600",
        fontSize: 16,
        textAlign: "center",
    }
})