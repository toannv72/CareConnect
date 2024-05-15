import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons";
import HomeScreen2 from "./src/page/Home2";
import Login from "./src/page/Login/Login";
import Register from "./src/page/Register/Register";
import Home from "./src/page/Home/Home";
import RegisterSuccess from "./src/page/Register/RegisterSuccess";
import Otp from "./src/page/Otp/Otp";
import NotificationPage from "./src/page/Notification/Notification";
import ComIcon from "./src/Components/ComIcon/ComIcon";
import ServicePackages from "./src/page/ServicePackages/ServicePackages";
import HealthMonitor from "./src/page/HealthMonitor/HealthMonitor";
import Notification from "./src/page/Notification/Notification";
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
        {/* <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="Search"
          component={Search}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const HomeStack = createNativeStackNavigator();
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
function MyBottomNavigationBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
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
        // tabBarIcon: ({ focused, color, size }) => {
        //   let iconName;
        //   if (route.name === "Home") {
        //     iconName = focused ? "home" : "home";
        //   } else if (route.name === "Like") {
        //     iconName = focused ? "home" : "home";
        //   } else if (route.name === "Profile") {
        //     iconName = focused ? "home" : "home";
        //   }
        //   return <Ionicons name={"home-outline"} size={24} color="white" />;
        // },
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
      keyboardShouldPersistTaps="handled"
    >
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomeStackScreen}
      />

      <Tab.Screen
        name="Visitation"
        options={{ headerShown: false }}
        component={ServicePackages}
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
      <Tab.Screen
        name="Account"
        options={{ headerShown: false }}
        component={Login}
      />
    </Tab.Navigator>
  );
}

export default Routes;
