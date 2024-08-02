import { useState, useEffect, useRef, useContext, useCallback } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { NotificationsContext } from '../../../src/contexts/NotificationsContext';
import ComNotification from "./ComNotification/ComNotifications";
import ComHeader from "../../Components/ComHeader/ComHeader";
import { LanguageContext } from "../../contexts/LanguageContext";
import { getData, patchData } from "../../api/api";
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import ComTitle from "../../Components/ComTitle/ComTitle";
import ComToast from "../../Components/ComToast/ComToast";
import ComNoData from "../../Components/ComNoData/ComNoData";

export default function Notification({ }) {
  const [select, setSelect] = useState(false);
  const [select1, setSelect1] = useState(true);
  const [select2, setSelect2] = useState(true);
  const [loading, setLoading] = useState(false);
  const [todayNotis, setTodayNotis] = useState([]);
  const [previousNotis, setPreviousNotis] = useState([]);
  const [displayedPreviousNotis, setDisplayedPreviousNotis] = useState([]);
  const [allRead, setAllRead] = useState(false);
  const [previousNotisLimit, setPreviousNotisLimit] = useState(10);
  const { updateNotifications } = useContext(NotificationsContext);

  const {
    text: { Notification, common: { button } },
    setLanguage,
  } = useContext(LanguageContext);

  const fetchNotifications = useCallback((limit) => {
    setLoading(true);
    getData(`/notifications`, {})
      .then((notifications) => {
        const allNotis = notifications?.data?.contends;
        const today = moment().startOf('day');
        const todayNotis = allNotis.filter((noti) => moment(noti.createdAt).isSame(today, 'day'));
        const previousNotis = allNotis.filter((noti) => !moment(noti.createdAt).isSame(today, 'day'));
        setTodayNotis(todayNotis);
        setPreviousNotis(previousNotis);
        setDisplayedPreviousNotis(previousNotis.slice(0, limit));
        const allReadStatus = allNotis.every((noti) => noti.isRead);
        setAllRead(allReadStatus);
        updateNotifications(allNotis)
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching notifications:", error);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      setPreviousNotisLimit(10); // Reset the limit to 10 items
      fetchNotifications(10);
    }, [])
  );

  const handleReadAll = async () => {
    if (allRead) {
      return;
    }
    patchData(`/notifications/readAll`, "", {}, {})
      .then((response) => {
        fetchNotifications(previousNotisLimit);
        ComToast({ text: 'Đánh dấu đã đọc tất cả thành công' });
      })
      .catch((error) => {
        setLoading(false)
        ComToast({ text: 'Đã xảy ra lỗi, vui lòng thử lại sau.' });
        console.error("API readAll Notification Error: ", error);
      });
  };

  const handleLoadMore = () => {
    const newLimit = previousNotisLimit + 10;
    setPreviousNotisLimit(newLimit);
    fetchNotifications(newLimit);
  };

  // const typeData = [
  //   { value: "HealthReport", label: "Báo cáo sức khỏe" },
  //   { value: "Contract", label: "Hợp đồng" },
  //   { value: "ScheduledService", label: "Đăng ký dịch vụ" }
  // ];

  // const statusData = [
  //   { value: "true", label: "Đã đọc" },
  //   { value: "false", label: "Chưa đọc" }
  // ];

  return (
    <>
      <ComHeader
        title={Notification?.title}
        showTitle
      />
      <View style={styles.body}>
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
          <ComSelect
            name="type"
            options={typeData}
            control={control}
            errors={errors}
            style={{ width: '49%' }}
            onChange={handleCategorySelect}
          />
          <ComSelect
            name="status"
            options={statusData}
            control={control}
            errors={errors}
            style={{ width: '49%' }}
            onChange={handlePriceOrderSelect}
          />
        </View> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles?.scrollView}
          showsHorizontalScrollIndicator={false}
        >
          {todayNotis?.length == 0 && previousNotis?.length == 0 ? (<ComNoData>Không có thông báo nào</ComNoData>
          ) : (
            <View>
              {todayNotis?.length > 0 &&
                (<View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <ComTitle style={{ fontSize: 16, marginBottom: 10 }}>Hôm nay</ComTitle>
                    <TouchableOpacity onPress={() => handleReadAll()}>
                      <Text style={{ color: allRead ? "#000" : "#33B39C" }}>Đánh dấu đã đọc tất cả</Text>
                    </TouchableOpacity>
                  </View>
                  <ComNotification tile={"Hôm nay"} data={todayNotis} />
                </View>
                )}
              {previousNotis?.length > 0 && (
                <View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <ComTitle style={{ fontSize: 16, marginBottom: 10 }}>Trước đó</ComTitle>
                    {todayNotis?.length == 0 && (
                      <TouchableOpacity onPress={() => handleReadAll()}>
                        <Text style={{ color: allRead ? "#000" : "#33B39C" }}>Đánh dấu đã đọc tất cả</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <ComNotification tile={"Trước đó"} data={displayedPreviousNotis} />
                  {displayedPreviousNotis?.length < previousNotis?.length && (
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                      <TouchableOpacity onPress={handleLoadMore}>
                        <Text style={styles.loadMoreText}>Xem thêm</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
            </View>
          )}
          <View style={{ height: 100 }}></View>
        </ScrollView>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 15
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    flexWrap: "wrap",
    marginBottom: 10,
  },
  scrollView: {
    flexGrow: 0,
    flexShrink: 0,
  },
  loadMoreText: {
    fontSize: 16,
    textAlign: "center",
    color: "#33B39C"
  },
});
