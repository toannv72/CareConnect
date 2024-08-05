import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import bell from "../../../../assets/bell.png";
import { getData, patchData } from "../../../api/api";

export default function ComNotification({ data }) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const parseJsonString = (jsonString) => {
    try {
      const jsonObject = JSON.parse(jsonString);
      return jsonObject;
    } catch (error) {
      return { error: error.message };
    }
  };

  const fetchHealthReport = async (reportid) => {
    try {
      const response = await getData(`/health-report/${reportid}`, {});
      return response?.data;
    } catch (error) {
      console.log("Error fetching health-report:", error);
      return null;
    }
  };

  const updateNotificationStatus = async (notiid) => {
    const dataPatch = { "isRead": true };
    try {
      await patchData(`/notifications`, notiid, dataPatch, {});
    } catch (error) {
      console.error("API read Notification Error: ", error);
    }
  };

  const handlePress = async (entity, id, notiId) => {
    await updateNotificationStatus(notiId);

    if (entity === 'HealthReport') {
      const reportData = await fetchHealthReport(id);
      if (reportData) {
        navigation.navigate("HealthMonitorDetail", { scrollToId: id, data: reportData });
      } else {
        console.error("Failed to fetch health report data");
      }
    } else {
      switch (entity) {
        case 'Contract':
          navigation.navigate("ContractDetail", { id: id });
          break;
        case 'ScheduledService':
          navigation.navigate("ScheduledService");
          break;
        case 'CareSchedule':
          navigation.navigate("NurseHomes", { screen: "CareSchedule" })
          break;
        default:
          console.error("Unknown entity: ", entity);
      }
    }
  };

  const ComDateTimeConverter = (dateTime) => {
    const date = new Date(dateTime);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes} - ${day}/${month}/${year}`;
  };

  return (
    <View style={styles.main}>
      <View style={styles.contex}>
        {data?.map((value, index) => (
          <View
            key={index}
            style={[index !== data?.length - 1 && styles.bodySeparator]}
          >
            <TouchableOpacity
              style={[
                styles.body,
                { backgroundColor: value.isRead ? "#fff" : "#DDF2EE" }
              ]}
              onPress={() => handlePress(parseJsonString(value?.data)?.Entity, parseJsonString(value?.data)?.Id, value?.id)}
            >
              <Image
                source={bell}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  borderWidth: 0.5,
                  borderColor: "#000",
                }}
              />
              <View style={styles.container}>
                <Text numberOfLines={2} style={{ fontWeight: "600", fontSize: 14 }}>
                  {value?.content}
                </Text>
                <Text>{value?.title}</Text>
                <Text style={{ fontSize: 12, color: "#A3A3A3" }}>{ComDateTimeConverter(value?.createdAt)}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginBottom: 15
  },
  body: {
    flexDirection: "row",
    gap: 20,
    padding: 15,
    borderRadius: 10,
  },
  bodySeparator: {
    borderBottomWidth: 1,
    borderBottomColor: "#33B39C",
  },
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 5
  },
  contex: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
  },
});
