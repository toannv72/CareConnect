import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/page/Login/Login";
import Register from "./src/page/Register/Register";
import Home from "./src/page/Home/Home";
import RegisterSuccess from "./src/page/Register/RegisterSuccess";
import Otp from "./src/page/Otp/Otp";
import ComIcon from "./src/Components/ComIcon/ComIcon";
import ComNurseIcon from "./src/Components/ComIcon/ComNurseIcon";
import ServicePackages from "./src/page/ServicePackages/ServicePackages";
import HealthMonitor from "./src/page/HealthMonitor/HealthMonitor";
import Notification from "./src/page/Notification/Notification";
import HealthMonitorDetail from "./src/page/HealthMonitorDetail/HealthMonitorDetail";
import VisitationSchedule from "./src/page/VisitationSchedule/VisitationSchedule";
import AddingServicePackages from "./src/page/AddingServicePackage/AddingServicePackage";
import AddingServiceDetail from "./src/page/AddingServiceDetail/AddingServiceDetail";
import AddingServiceElderRegister from "./src/page/AddingServiceRegister/AddingServiceElderRegister";
import AddingServiceCalendarRegister from "./src/page/AddingServiceRegister/AddingServiceCalendarRegister";
import ServicePayment from "./src/page/ServicePayment/ServicePayment";
import ServiceHistory from "./src/page/ServiceHistory/ServiceHistory/ServiceHistory";
import ServiceHistoryDetail from "./src/page/ServiceHistory/ServiceHistoryDetail/ServiceHistoryDetail";
import CancelRenewSuccess from "./src/page/ServiceHistory/ServiceHistoryDetail/CancelRenewSuccess";
import CreateFeedback from "./src/page/Feedback/CreateFeedback";
import FeedbackHistory from "./src/page/Feedback/FeedbackHistory";
import FeedbackDetail from "./src/page/Feedback/FeedbackDetail";
import BillHistory from "./src/page/Bills/BillHistory";
import BillDetail from "./src/page/Bills/BillDetail";
import UserProfile from "./src/page/UserProfile/UserProfile";
import ElderProfile from "./src/page/ElderProfile/ElderProfile";
import ElderDetailProfile from "./src/page/ElderProfile/ElderDetailProfile";
import MedicalProfile from "./src/page/ElderProfile/MedicalProfile/MedicalProfile";
import EditProfile from "./src/page/UserProfile/EditProfile/EditProfile";
import DetailProfile from "./src/page/UserProfile/DetailProfile";
import ForgetPassword from "./src/page/ForgetPassword/ForgetPassword";
import OtpForgetPassword from "./src/page/ForgetPassword/OtpForgetPassword";
import ResetPassword from "./src/page/ForgetPassword/ResetPassword";
import ResetPasswordSuccess from "./src/page/ForgetPassword/ResetPasswordSuccess";
import ChangePassword from "./src/page/ChangePassword/ChangePassword";
import ChangePasswordSuccess from "./src/page/ChangePassword/ChangePasswordSuccess";
import RegisterVisitation from "./src/page/RegisterVisitation/RegisterVisitation";
import RegisterVisitationSuccess from './src/page/RegisterVisitation/RegisterVisitationSuccess';
import Contracts from "./src/page/Contract/Contracts";
import ContractDetail from "./src/page/ContractDetail/ContractDetail";
import ContractCandSuccess from "./src/page/ContractDetail/ContractCandSuccess";
// -------Role: Nurse--------
import NurseHome from "./src/nursePage/Home/NurseHome";
import NurseProfile from "./src/nursePage/NurseProfile/NurseProfile";
import CareSchedule from "./src/nursePage/CareSchedule/CareSchedule";
import RoomList from "./src/nursePage/RoomList/RoomList";
import RoomDetail from "./src/nursePage/RoomList/RoomDetail";
import NurseElderDetailProfile from "./src/nursePage/ElderProfile/NurseElderDetailProfile";
import CustomerProfile from "./src/nursePage/CustomerProfile/CustomerProfile";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Homes">
        <Stack.Screen
          name="Homes"
          options={{ headerLeft: null, headerShown: false }}
          component={MyBottomNavigationBar}
        />
          <Stack.Screen
          name="NurseHomes"
          options={{ headerLeft: null, headerShown: false }}
          component={NurseBottomNavigationBar}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="Register"
          component={Register}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="RegisterSuccess"
          component={RegisterSuccess}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="Otp"
          component={Otp}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="Service"
          component={ServicePackages}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="AddingService"
          component={AddingServicePackages}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="AddingServiceDetail"
          component={AddingServiceDetail}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="AddingServiceRegister"
          component={AddingServiceElderRegister}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="AddingServiceCalendarRegister"
          component={AddingServiceCalendarRegister}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="ServicePayment"
          component={ServicePayment}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="ServiceHistory"
          component={ServiceHistory}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="ServiceHistoryDetail"
          component={ServiceHistoryDetail}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="CancelRenewSuccess"
          component={CancelRenewSuccess}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="CreateFeedback"
          component={CreateFeedback}
        />
           <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="FeedbackHistory"
          component={FeedbackHistory}
        />
         <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="FeedbackDetail"
          component={FeedbackDetail}
        />
         <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="BillHistory"
          component={BillHistory}
        />
          <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="BillDetail"
          component={BillDetail}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="HealthMonitorDetail"
          component={HealthMonitorDetail}
        />
        {/* đăng ký thăm nuôi */}
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="VisitationSchedule"
          component={VisitationSchedule}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="RegisterVisitation"
          component={RegisterVisitation}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="RegisterVisitationSuccess"
          component={RegisterVisitationSuccess}
        />

        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="EditProfile"
          component={EditProfile}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="DetailProfile"
          component={DetailProfile}
        />
          <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="ElderProfile"
          component={ElderProfile}
          />
           <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="ElderDetailProfile"
          component={ElderDetailProfile}
          />
           <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="MedicalProfile"
          component={MedicalProfile}
          />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="ChangePassword"
          component={ChangePassword}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="ChangePasswordSuccess"
          component={ChangePasswordSuccess}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="ForgetPassword"
          component={ForgetPassword}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="OtpForgetPassword"
          component={OtpForgetPassword}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="ResetPassword"
          component={ResetPassword}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="ResetPasswordSuccess"
          component={ResetPasswordSuccess}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="Contracts"
          component={Contracts}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="ContractDetail"
          component={ContractDetail}
        />
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="ContractCandSuccess"
          component={ContractCandSuccess}
        />
        {/* =======nurse====== */}
        <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="RoomList"
          component={RoomList}
        />
         <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="RoomDetail"
          component={RoomDetail}
        />
           <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="NurseElderDetailProfile"
          component={NurseElderDetailProfile}
        />
         <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="CustomerProfile"
          component={CustomerProfile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const HomeStack = createNativeStackNavigator();
const NurseStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="NotificationPage"
        component={Home}
      />
      <HomeStack.Screen name="Details" component={Login} />
    </HomeStack.Navigator>
  );
}
function NurseStackScreen() {
  return (
    <NurseStack.Navigator>
      <NurseStack.Screen
        options={{ headerShown: false }}
        name="NotificationPage"
        component={NurseHome}
      />
      <NurseStack.Screen name="Details" component={Login} />
    </NurseStack.Navigator>
  );
}
function MyBottomNavigationBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
          elevation: 0,
          backgroundColor: "#14A499",
          borderRadius: 15,
          height: 90,
          elevation: 30, // Bóng đổ cho Android
          shadowColor: "#000", // Màu của bóng đổ cho iOS
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 3.84,
          elevation: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "Nav1" : "Nav1_1";
          } else if (route.name === "Visitation") {
            iconName = focused ? "Nav2" : "Nav2_1";
          } else if (route.name === "HealthCondition") {
            iconName = focused ? "Nav3" : "Nav3_1";
          } else if (route.name === "Notification") {
            iconName = focused ? "Nav4" : "Nav4_1";
          } else if (route.name === "Account") {
            iconName = focused ? "Nav5" : "Nav5_1";
          }

          // You can return any component that you like here!
          // return <Ionicons name={iconName} size={size} color={"back"} />;
          return <ComIcon icon={iconName} />;
        },
      })}
      // keyboardShouldPersistTaps="handled"
    >
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomeStackScreen}
      />
      <Tab.Screen
        name="Visitation"
        options={{ headerShown: false }}
        component={ElderProfile}
      />
      <Tab.Screen
        name="HealthCondition"
        options={{ headerShown: false }}
        component={HealthMonitor}
      />
      <Tab.Screen
        name="Notification"
        options={{ headerShown: false }}
        component={Notification}
      />
      {/* <Tab.Screen
        name="Account"
        options={{ headerShown: false }}
        component={VisitationSchedule}
      /> */}
      <Tab.Screen
        name="Account"
        options={{ headerShown: false }}
        component={UserProfile}
      />
    </Tab.Navigator>
  );
}

function NurseBottomNavigationBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
          elevation: 0,
          backgroundColor: "#14A499",
          borderRadius: 15,
          height: 90,
          elevation: 30, // Bóng đổ cho Android
          shadowColor: "#000", // Màu của bóng đổ cho iOS
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 3.84,
          elevation: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "Nav1" : "Nav1_1";
          } else if (route.name === "CareSchedule") {
            iconName = focused ? "Nav2" : "Nav2_1";
          } else if (route.name === "Notification") {
            iconName = focused ? "Nav4" : "Nav4_1";
          } else if (route.name === "Account") {
            iconName = focused ? "Nav5" : "Nav5_1";
          }

          // You can return any component that you like here!
          // return <Ionicons name={iconName} size={size} color={"back"} />;
          return <ComNurseIcon icon={iconName} />;
        },
      })}
      // keyboardShouldPersistTaps="handled"
    >
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={NurseStackScreen}
      />
      <Tab.Screen
        name="CareSchedule"
        options={{ headerShown: false }}
        component={CareSchedule}
      />
      <Tab.Screen
        name="Notification"
        options={{ headerShown: false }}
        component={Notification}
      />
      <Tab.Screen
        name="Account"
        options={{ headerShown: false }}
        component={NurseProfile}
      />
    </Tab.Navigator>
  );
}

export default Routes;
