import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Keyboard, ActivityIndicator } from "react-native";
import ComHeader from "../../Components/ComHeader/ComHeader";
import ComButton from "../../Components/ComButton/ComButton";
import ComPopup from "../../Components/ComPopup/ComPopup";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import ComInput from "../../Components/ComInput/ComInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComSelectedOneDate from "../../Components/ComDate/ComSelectedOneDate";
import moment from "moment";
import ContractImg from "../../../assets/images/Contract/Contract.png";
import ComDateConverter from "../../Components/ComDateConverter/ComDateConverter";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "../../../auth/useAuth";
import { postData, getData } from "../../api/api";
import ComLoading from "../../Components/ComLoading/ComLoading";
import ImageModal from 'react-native-image-modal'

export default ContractDetail = () => {
  const { user } = useAuth();
  const [popup, setPopup] = useState(false);
  const [data, setData] = useState(false);
  const [contractAppointment, setContractAppointment] = useState({});//lấy Appointment theo ContractId 
  const [loading, setLoading] = useState(false);
  const [popupDate, setPopupDate] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const handleClosePopup = () => {
    reset();
    setPopup(false);
  };
  const handleOpenPopup = () => {
    setPopup(true);
  };
  const handleClosePopupDate = () => {
    setPopupDate(false);
    reset();
  };
  const handleOpenPopupDate = () => {
    setPopupDate(true);
    setPopup(false);
  };

  const changeSelectedDate = (data) => {
    // setSelectedDate(data);
  };

  const {
    text: {
      servicePackages,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);

  const loginSchema = yup.object().shape({
    date: yup.string().trim()
  })

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { reason: "", date: "" },
  });

  const { control, handleSubmit, reset, watch, formState: { errors }, } = methods;
  const reason = watch("reason");
  const selectedDate = watch("date");

  const getStatusText = (status) => {
    switch (status) {
      case 'Valid':
        return { text: 'Còn hạn', color: 'green' };
      case 'Cancelled':
        return { text: 'Đã hủy', color: 'red' };
      case 'Expired':
        return { text: 'Hết hạn', color: 'red' };
      case 'Pending':
        return { text: 'Đang chờ' };
      default:
        return status;
    }
  };

  const status = getStatusText(data?.status);

  useEffect(() => {
    setLoading(true);
    getData(`/contract/${id}`, {})
      .then((contract) => {
        setData(contract?.data);
      })
      .catch((error) => {
        console.log("Error fetching contract", error);
        setLoading(false);
      });

    getData(`/appointments?UserId=${user?.id}&ContractId=${id}`, {})
      .then((appointment) => {
        setLoading(false);
        setContractAppointment(appointment?.data?.contends);
      })
      .catch((error) => {
        console.log("Error fetching appointments?ContractId:", error);
        setLoading(false);
      });
  }, [])

  const handleCreateAppointment = (formData) => {
    setLoading(true)
    Keyboard.dismiss();
    const text = formData?.reason == "" ? "Lịch hẹn gia hạn hợp đồng" : "Lịch hẹn kết thúc hợp đồng";
    const newData = {
      ...formData,
      name: text,
      content: text,
      notes: text,
      userId: user?.id,
      date: moment(formData?.date).format("YYYY-MM-DD").toString(),
      type: formData?.reason == "" ? "ProcedureCompletion" : "Cancel",
      contractId: id,
      elders: [{ id: data?.elder?.id }]
    };
    postData("/appointments", newData, {})
      .then((appointments) => {
        setLoading(false)
        handleClosePopupDate()
        handleClosePopup()
        if (formData?.reason == "")
          navigation.navigate("ContractRenewSuccess", { data: formData });
        else
          navigation.navigate("ContractCandSuccess", { data: formData });
      })
      .catch((error) => {
        setLoading(false)
        handleClosePopup()
        handleClosePopupDate()
        console.log("Error registering:", error);
      });
  };

  const endDate = moment(data?.endDate);
  const isWithinOneMonth = endDate.isValid() && endDate.diff(moment(), 'days') <= 30;
  //ngày hiện tại cách ngày kết thúc hợp đồng ít hơn hoặc = 1 tháng
  return (
    <>
      <ComPopup
        visible={popup}
        title="Bạn muốn yêu cầu hủy hợp đồng ?"
        onClose={handleClosePopup}
      >
        <FormProvider {...methods}>
          <View style={{ width: "100%", gap: 10 }}>
            <Text style={{ color: "#A3A3A3", textAlign: "center" }}>Thủ tục sẽ chính thức được hoàn tất khi bạn đến Viện vào ngày hẹn và đón người thân về nhà</Text>
            <ComInput
              label={"Xin cho chúng tôi biết lý do "}
              placeholder={"Lý do"}
              name="reason"
              control={control}
              keyboardType="default" // Set keyboardType for First Name input
              errors={errors} // Pass errors object
              required
            />
            <View
              style={{
                backgroundColor: "#fff",
                flexDirection: "row",
                justifyContent: "space-around",
                gap: 10
              }}
            >
              <ComButton check onPress={handleClosePopup} style={{flex: 1}}>
                Hủy
              </ComButton>
              <ComButton onPress={handleOpenPopupDate} disable={reason === ""} style={{flex: 1}}>
                {loading ? <ActivityIndicator /> : "Xác nhận"}
              </ComButton>
            </View>
          </View>
        </FormProvider>
      </ComPopup>

      <ComPopup
        visible={popupDate}
        title="Chọn ngày hẹn"
        onClose={handleClosePopupDate}
      >
        <FormProvider {...methods}>
          <Text style={{ color: "#A3A3A3", textAlign: "center" }}>{servicePackages?.popup?.limitDays}</Text>
          <View style={{ width: "100%", gap: 10 }}>
            <ComSelectedOneDate
              date={changeSelectedDate}
              name="date"
              control={control}
              errors={errors}
              enabled={true}
              minDate={moment().add(1, 'day').toString()}
              maxDate={
                reason !== "" // người dùng hủy hợp đồng
                  ? moment().add(14, 'days').toString() // Nếu đúng, thiết lập `maxDate` là 14 ngày từ hôm nay
                  : moment(data?.endDate).diff(moment(), 'days') > 14 //người dùng gia hạn && enddate cách hientai > 14 ngay
                    ? moment().add(14, 'days').toString() // maxdate là 14 ngày sau
                    : moment(data?.endDate).toString() // enddate cách hientai < 14 ngay, `maxDate` là enddate
              }
            />
            <View
              style={{
                backgroundColor: "#fff",
                flexDirection: "row",
                justifyContent: "space-around",
                gap: 25
              }}
            >
              <ComButton check onPress={handleClosePopupDate} style={{ flex: 1 }}>
                Hủy
              </ComButton>
              <ComButton onPress={handleSubmit(handleCreateAppointment)} style={{ flex: 1 }} disable={selectedDate == ""}>
                {loading ? <ActivityIndicator /> : "Xác nhận"}
              </ComButton>
            </View>
          </View>
        </FormProvider>
      </ComPopup>

      <ComHeader
        showBackIcon={true}
        showTitle={true}
        title={"Chi tiết hợp đồng"}
      />
      <View style={styles.main}>
        <ComLoading show={loading}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View style={{ alignItems: 'center', marginVertical: 20 }}>
              <Image source={ContractImg} style={{ height: 100, width: 100, objectFit: "fill", }} />
            </View>
            {(contractAppointment?.length > 0 && data?.status == "Valid") &&
              (contractAppointment[0]?.type == "ProcedureCompletion" ?
                <Text style={{ color: "green", textAlign: "center", marginBottom: 10 }}>
                  Bạn đã đặt lịch hẹn gia hạn hợp đồng vào {<ComDateConverter>{contractAppointment[0]?.date}</ComDateConverter>}
                </Text>
                : <Text style={{ color: "red", textAlign: "center", marginBottom: 10 }}>
                  Bạn đã đặt lịch hẹn hủy hợp đồng vào {<ComDateConverter>{contractAppointment[0]?.date}</ComDateConverter>}
                </Text>
              )
            }
            <View style={styles.contex}>
              <View style={styles.bodySeparator}>
                <Text style={styles.text}>Hợp đồng</Text>
                <Text style={styles.text2}>{data?.name}</Text>
              </View>
              <View style={styles.bodySeparator}>
                <Text style={styles.text}>Mã hợp đồng</Text>
                <Text style={styles.text2}>{data?.id}</Text>
              </View>
              <View style={styles.bodySeparator}>
                <Text style={styles.text}>Người đại diện</Text>
                <Text style={styles.text2}>{data?.user?.fullName}</Text>
              </View>
              <View style={styles.bodySeparator}>
                <Text style={styles.text}>Người cao tuổi</Text>
                <Text style={styles.text2}>{data?.elder?.name}</Text>
              </View>
              <View style={styles.bodySeparator}>
                <Text style={styles.text}>Gói dưỡng lão</Text>
                <Text style={styles.text2}>{data?.nursingPackage?.name}</Text>
              </View>
              <View style={styles.bodySeparator}>
                <Text style={styles.text}>Ngày ký</Text>
                <Text style={styles.text2}> <ComDateConverter>{data?.signingDate}</ComDateConverter> </Text>
              </View>
              <View style={styles.bodySeparator}>
                <Text style={styles.text}>Ngày bắt đầu</Text>
                <Text style={styles.text2}> <ComDateConverter>{data?.startDate}</ComDateConverter> </Text>
              </View>
              <View style={styles.bodySeparator}>
                <Text style={styles.text}>Ngày kết thúc</Text>
                <Text style={styles.text2}> <ComDateConverter>{data?.endDate}</ComDateConverter> </Text>
              </View>
              <View style={styles.bodySeparator2}>
                <Text style={styles.text}>Trạng thái</Text>
                <Text style={[styles.text2, { color: status?.color }]}>{status?.text}</Text>
              </View>
            </View>

            <View style={{}}>
              <View style={{ marginVertical: 10 }}>
                <Text style={styles.text}>Hình ảnh hợp đồng</Text>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                {
                  data?.images?.length == 0 ? (<Text>Không có hình ảnh nào</Text>)
                    : (
                      data?.images?.map((image, index) => (
                        // <Image key={index} source={{ uri: image?.imageUrl || "" }} style={{ height: 100, width: 100, objectFit: "fill", borderWidth: 0.5, borderColor: "#000"}} />
                        <ImageModal
                          key={index}
                          resizeMode='contain'
                          imageBackgroundColor='#000000'
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "fill",
                            borderWidth: 0.5,
                            borderColor: "#000"
                          }}
                          source={{
                            uri: image?.imageUrl,
                          }}
                        />
                      ))
                    )
                }
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 20,
                gap: 20
              }}
            >
              {/* hopdong còn hạn           chưa tạo 1 appoimnet nào         hết hạn trong vòng 1 tháng tới */}
              {(data?.status == "Valid" && contractAppointment?.length == 0 && isWithinOneMonth) ? (
                <ComButton onPress={handleOpenPopupDate} style={{ flex: 1 }}>Yêu cầu gia hạn</ComButton>
              ) : (
                (data?.status == "Valid" && contractAppointment?.length == 0) &&
                <ComButton onPress={handleOpenPopup} style={{ flex: 1 }}>Yêu cầu hủy</ComButton>
              )}
            </View>
          </ScrollView>

        </ComLoading>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    gap: 15,
  },
  bodySeparator: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#33B39C",
    alignItems: "center",
    marginHorizontal: 15,
  },
  bodySeparator2: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginHorizontal: 15,
  },
  text: {
    flex: 0.35,
    fontSize: 16,
    fontWeight: "600",
  },
  text2: {
    fontSize: 16,
    flex: 0.65,
    textAlign: "right"
  },
  contex: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#33B39C",
    paddingHorizontal: 5,
    paddingVertical: 10
  },
});
