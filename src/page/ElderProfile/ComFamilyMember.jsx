import React, { useState } from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity, Modal, Linking } from "react-native";
import ComToast from "../../Components/ComToast/ComToast";
import { useNavigation } from "@react-navigation/native";
import { deleteData } from "../../api/api";
import ComPopup from "../../Components/ComPopup/ComPopup";
import ComButton from "../../Components/ComButton/ComButton";
import plusIcon from "../../../assets/profile_icons/plus.png";
import phoneIcon from '../../../assets/icon/phone.png';
import { useAuth } from "../../../auth/useAuth";

export default function ComFamilyMember({ familyMems, setRefresh, data, canAdd }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedFamilyMember, setSelectedFamilyMember] = useState(null);
    const [popup, setPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const { role } = useAuth();

    const toggleModal = (member) => {
        setSelectedFamilyMember(member);
        setIsModalVisible(!isModalVisible);
    };

    const viewDetail = () => {
        navigation.navigate("FamilyMemberProfile", { familyId: selectedFamilyMember?.id, canEdit: canAdd })
        setIsModalVisible(false);
    };

    const update = () => {
        navigation.navigate("EditFamilyMemberProfile", { memberData: selectedFamilyMember })
        setIsModalVisible(false);
    };

    const deleteFamilyMember = async (id) => {
        deleteData(`/family-member`, id)
            .then((response) => {
                setLoading(false)
                setIsModalVisible(false);
                setPopup(false);
                ComToast({ text: 'Xóa thành công' });
                setRefresh(prev => !prev);
            })
            .catch((error) => {
                setLoading(false)
                setPopup(false);
                ComToast({ text: 'Đã có lỗi xảy ra. Vui lòng thử lại.' });
            });
    }

    const callNumber = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`);
      };

    return (
        <>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 10 }}>
                <Text style={{ fontWeight: "bold", marginRight: 4 }}>Danh sách người giám hộ</Text>
                {
                    (canAdd && role?.name == "Customer") && (
                        <TouchableOpacity style={styles.register} onPress={() => navigation.navigate("FamilyMember", { elderId: data?.id })}>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
                                <Image
                                    source={plusIcon}
                                    style={{ height: 25, width: 25, objectFit: "fill" }}
                                />
                                <Text style={{ color: "#000", paddingHorizontal: 5, fontWeight: "bold" }}>
                                    Thêm mới
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
            </View>
            <View style={styles.contex}>
                {
                    familyMems?.length === 0 ?
                        (
                            role?.name == "Customer" ? (
                                <Text style={{ marginHorizontal: 15, color: "#A3A3A3" }}>Chưa có người giám hộ. Vui lòng thêm người giám hộ để đề phòng trường hợp khẩn cấp</Text>
                            ) : (
                                <Text style={{ marginHorizontal: 15, color: "#A3A3A3" }}>Chưa có người giám hộ.</Text>
                            )
                        ) : (
                            role?.name == "Customer" ? (<>
                                <View style={[styles.bodySeparator, { borderTopWidth: 0 }]}>
                                    <Text style={[styles.text, { flex: 5 }]}>Họ và tên</Text>
                                    <Text style={[styles.text, { flex: 4, textAlign: "center" }]}>Số điện thoại</Text>
                                    <Text style={[styles.text, { flex: 2, textAlign: "right" }]}></Text>
                                </View>
                                {
                                    familyMems?.map((family, index) => (
                                        <View key={index} style={styles.bodySeparator}>
                                            <TouchableOpacity onPress={() => navigation.navigate("FamilyMemberProfile", { familyId: family?.id, canEdit: canAdd })} style={[{ flex: 5 }]}>
                                                <Text style={{ color: "#33B39C" }}>{family?.name}</Text>
                                            </TouchableOpacity>
                                            <Text style={[styles.text2, { flex: 4, textAlign: "center" }]}>{family?.phoneNumber}</Text>
                                            <View style={{ flex: 2, alignItems: "flex-end" }}>
                                                <TouchableOpacity onPress={() => toggleModal(family)} style={[{ flex: 5, paddingHorizontal: 20, paddingVertical: 3 }]}>
                                                    <Text style={{ fontWeight: "bold", fontSize: 20 }}>⁝</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ))
                                }
                            </>) : (
                                <>
                                    <View style={[styles.bodySeparator, { borderTopWidth: 0 }]}>
                                        <Text style={[styles.text, { flex: 5 }]}>Họ và tên</Text>
                                        <Text style={[styles.text, { flex: 4, textAlign: "center" }]}>Số điện thoại</Text>
                                        <Text style={[styles.text, { flex: 2, textAlign: "right" }]}>Gọi</Text>
                                    </View>
                                    {
                                        familyMems?.map((family, index) => (
                                            <View key={index} style={styles.bodySeparator}>
                                                <TouchableOpacity onPress={() => navigation.navigate("FamilyMemberProfile", { familyId: family?.id })} style={[{ flex: 5 }]}>
                                                    <Text style={{ color: "#33B39C" }}>{family?.name}</Text>
                                                </TouchableOpacity>
                                                <Text style={[styles.text2, { flex: 4, textAlign: "center" }]}>{family?.phoneNumber}</Text>
                                                <View style={{ flex: 2, alignItems: "flex-end" }}>
                                                    <TouchableOpacity onPress={() => { callNumber(family?.phoneNumber) }} style={[{ flex: 5 }]}>
                                                        <Image
                                                            source={phoneIcon}
                                                            style={{
                                                                width: 20,
                                                                height: 20,
                                                                tintColor: "#33B39C"
                                                            }}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        ))
                                    }
                                </>
                            )

                        )
                }
            </View>

            <Modal visible={isModalVisible} transparent={true} animationType="slide" onRequestClose={() => setIsModalVisible(false)}>
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.modalButton} onPress={() => viewDetail()}>
                            <Text style={styles.modalButtonText}>Xem chi tiết</Text>
                        </TouchableOpacity>
                        {/* {
                            canAdd && (
                                <TouchableOpacity style={styles.modalButton} onPress={() => update(

                                ) }>
                                    <Text style={styles.modalButtonText}>Cập nhật</Text>
                                </TouchableOpacity>
                            )
                        } */}
                        <TouchableOpacity style={styles.modalButton} onPress={() => { setPopup(true); setIsModalVisible(false) }}>
                            <Text style={[styles.modalButtonText, { color: "red" }]}>Xóa</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
            <ComPopup
                visible={popup}
                title="Bạn có chắc muốn xóa thông tin của người giám hộ này?"
                onClose={() => setPopup(false)}
            >
                <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10, }}>
                    <ComButton onPress={() => setPopup(false)} check={true} warning={true} style={{ flex: 1 }}>
                        Hủy
                    </ComButton>
                    <ComButton onPress={() => { deleteFamilyMember(selectedFamilyMember?.id) }} style={{ flex: 1 }} warning={true}>
                        Xác nhận
                    </ComButton>
                </View>
            </ComPopup>
        </>
    );
}

const styles = StyleSheet.create({
    bodySeparator: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        paddingVertical: 5,
        borderTopWidth: 0.5,
        borderTopColor: "#33B39C",
        alignItems: "center",
        marginHorizontal: 15,
        gap: 10
    },
    text: {
        // flex: 0.35,
        fontWeight: "600",
    },
    text2: {
        flex: 0.65,
        textAlign: "center",
    },
    register: {
        flexDirection: "row",
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#33B39C",
        backgroundColor: "#caece6",
        elevation: 4, // Bóng đổ cho Android
        shadowColor: "#000", // Màu của bóng đổ cho iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4,

    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 8,
        width: 300,
    },
    modalButton: {
        paddingVertical: 10,
    },
    modalButtonText: {
        fontSize: 18,
        color: "#333333",
        textAlign: "center",
    },
    contex: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#33B39C",
        paddingHorizontal: 5,
        paddingVertical: 5
    },
});