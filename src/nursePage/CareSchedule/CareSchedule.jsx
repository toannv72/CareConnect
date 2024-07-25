import { useState, useEffect, useContext, useCallback } from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComSchedule from "./ComSchedule";
import { Calendar } from "react-native-calendars";
import { useAuth } from "../../../auth/useAuth";
import moment from "moment";
import noTask from "../../../assets/images/Nurse/CareSchedule/noTask.png";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import LocaleConfig from "../../configs/LocalizationConfig";
import { getData } from "../../api/api";

export default function CareSchedule() {
    const today = moment().format("YYYY-MM-DD");
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(today);
    const [loading, setLoading] = useState(false);
    const [nurseSchedules, setNurseSchedules] = useState([]); // List of dates for EmployeeType
    const [careSchedule, setCareSchedule] = useState([]); // CareSchedule (which rooms)
    const [currentMonth, setCurrentMonth] = useState(moment().month() + 1); // Current month
    const [currentYear, setCurrentYear] = useState(moment().year()); // Current year
    const [calendarKey, setCalendarKey] = useState(0); // Key to force re-render of Calendar
    const { user } = useAuth();

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

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    const onMonthChange = (month) => {
        const newMonth = month.month < 10 ? `0${month.month}` : month.month;
        const newYear = month.year;
        setCurrentMonth(month.month); // Update current month to know the month being selected and compare
        setCurrentYear(month.year); // Update current year to know the year being selected and compare
        // Fetch data for the new month and year
        const fetchData = async () => {
            await getEmployeeSchedule(newMonth, newYear); // call the API with the new month and year
        };
        fetchData();
    };

    useFocusEffect(
        useCallback(() => {
            setSelectedDate(today);
            setCurrentMonth(moment().month() + 1); // Reset current month to current month
            setCurrentYear(moment().year()); // Reset current year to current year
            setCalendarKey(prevKey => prevKey + 1); // Update calendar key to force re-render
            const fetchData = async () => {
                await getEmployeeSchedule(); // Fetch initial data
            };
            fetchData();
        }, [])
    );

    useEffect(() => {
        const newMarkedDates = nurseSchedules.reduce((acc, item) => {
            const itemDate = item?.monthlyCalendar?.dateInMonth; // get date in month
            const itemFullDate = moment(`${currentYear}-${currentMonth}-${itemDate}`, "YYYY-MM-DD").format("YYYY-MM-DD"); // create full date = itemDate, selected month and year (default is current)
            acc[itemFullDate] = { // mark as a day with task
                dots: [{ key: 'task', color: 'red' }],
                selected: itemFullDate === selectedDate
            };
            return acc;
        }, { [selectedDate]: { selected: true } });

        setMarkedDates(newMarkedDates); // Update marked dates
    }, [selectedDate, nurseSchedules, currentMonth, currentYear]);

    // Check if selected date is in the list of dates for EmployeeType
    const filteredData = nurseSchedules.filter(item => {
        const itemDate = moment(`${currentYear}-${currentMonth}-${item?.monthlyCalendar?.dateInMonth}`, "YYYY-MM-DD").format("YYYY-MM-DD");
        return itemDate === selectedDate;
    });

    const getEmployeeSchedule = async (month = moment().month() + 1, year = moment().year()) => {
        setLoading(true);
        try {
            const schedule = await getData(`/employee-schedule?UserId=${user?.id}&CareMonth=${month}&CareYear=${year}`, {});
            const contents = schedule?.data?.contends;

            if (contents && contents.length > 0) { // If there are scheduled items
                setCareSchedule(contents[0]?.careSchedule); // Set careSchedule (which rooms)
                await getEmployeeType(contents[0]?.employeeType?.id); // Fetch dates for EmployeeType
            } else {
                // If no scheduled items, clear careSchedule and nurseSchedules
                setCareSchedule([]);
                setNurseSchedules([]);
            }
        } catch (error) {
            console.error("Error fetching order items:", error);
        } finally {
            setLoading(false);
        }
    };

    const getEmployeeType = async (employeeTypeId) => { // Fetch dates for EmployeeType
        setLoading(true);
        try {
            const type = await getData(`/employee-type/${employeeTypeId}`, {});
            setNurseSchedules(type?.data?.monthlyCalendarDetails);
        } catch (error) {
            console.error("Error fetching type items:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ComHeader
                title={CareSchedule?.title}
                showTitle
            />
            <View style={styles.body}>
                <Calendar
                    key={calendarKey} // Use the calendar key to force re-render
                    markingType={'multi-dot'}
                    markedDates={markedDates}
                    style={{ marginHorizontal: 15, marginBottom: 5 }}
                    current={moment().format("YYYY-MM-DD")} // Set current date to focus on
                    onDayPress={onDayPress}
                    onMonthChange={onMonthChange}
                    {...LocaleConfig}
                />
                {filteredData?.length > 0 ? (
                    <View style={styles.taskContainer}>
                        <Text style={[styles.dateTitle]}>
                            {moment(selectedDate).format('DD/MM/YYYY')}
                        </Text>

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        >
                            {careSchedule?.rooms?.length > 0 && (
                                careSchedule?.rooms.map((room, index) => (
                                    <ComSchedule
                                        key={index}
                                        data={room} // List of rooms in the schedule
                                        shift={filteredData[0]?.shifts} // Shifts for the selected date
                                        onPress={() => navigation.navigate("RoomDetail", { roomData: room })}
                                    />
                                ))
                            )}

                            <View style={{ height: 500 }} />
                        </ScrollView>
                    </View>
                ) : (
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
    );
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
});
