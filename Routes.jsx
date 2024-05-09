import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen2 from "./src/page/Home2";
import Login from "./src/page/Login/Login";
import Register from "./src/page/Register/Register";
import Home from "./src/page/Home/Home";
import RegisterSuccess from "./src/page/Register/RegisterSuccess";
import Otp from "./src/page/Otp/Otp";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Otp">
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
        {/* <Stack.Screen
          options={{ headerLeft: null, headerShown: false }}
          name="Search"
          component={Search}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

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
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Like") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-add" : "person-add-outline";
          }
          return <Ionicons name={iconName} size={size} color="white" />;
        },
      })}
      keyboardShouldPersistTaps="handled"
    >
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={Home}
      />

      <Tab.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={HomeScreen2}
      />
    </Tab.Navigator>
  );
}

export default Routes;
