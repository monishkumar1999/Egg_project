import { Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import { OtpInput } from "react-native-otp-entry";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { useRouter } from "expo-router";

const Otp = () => {
  const router = useRouter();
  const [userOtp, setOtp] = useState("");

  const checkOtp = () => {
    const correctOtp = "123456"; // Use string comparison
    if (userOtp === correctOtp) {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: "Login successful",
      });

      router.replace("/component/home/home");

    } else {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Failed",
        textBody: "Wrong OTP",
      });
    }
  };

  return (
    <View className="flex-1 justify-center">
      <Text className="text-lg font-semibold text-gray-700 mb-2 mx-2">
        Enter OTP
      </Text>
      <View className="m-2">
        <OtpInput numberOfDigits={6} onTextChange={(text) => setOtp(text)} />
      </View>

      <Pressable
        className="w-full py-4 mt-6 rounded-full shadow-xl bg-yellow-500"
        onPress={checkOtp}>
        <Text className="text-center text-black font-bold text-lg">Submit</Text>
      </Pressable>
    </View>
  );
};

export default Otp;
