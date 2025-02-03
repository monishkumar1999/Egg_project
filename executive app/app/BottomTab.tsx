import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";

export default function BottomTab() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", label: "Home", route: "/component/home/home" },
    { id: "chart", label: "Chart", route: "/component/customer/addCustomer" },
    { id: "users", label: "Users", route: "/users" },
    { id: "factory", label: "Factory", route: "/factory" },
    { id: "analytics", label: "Analytics", route: "/analytics" },
  ];

  return (
    <View className="absolute bottom-5 left-5 right-5 flex-row justify-between bg-white rounded-full shadow-md p-2">
      {tabs.map(({ id, label, route }) => (
        <TouchableOpacity
          key={id}
          className={`w-20 h-14 flex justify-center items-center rounded-full ${
            activeTab === id ? "bg-purple-500" : "bg-gray-100"
          }`}
          onPress={() => {
            setActiveTab(id);
            router.push(route);
          }}
        >
          <Text className={`font-bold ${activeTab === id ? "text-white" : "text-black"}`}>
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
