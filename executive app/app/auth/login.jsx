import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ActivityIndicator } from "react-native";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";

const Login = () => {
  // State to store mobile and password
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const router = useRouter();
  // Handle login action
  const handleLogin = () => {
    setLoading(true); // Start loading

    router.push("/auth/otp")
    // setTimeout(() => {
    //   const usermobile = "6380129370"; // Use string for proper comparison
    //   const userpassword = "123";

    //   console.log(mobile)
    //   if (!mobile || !password) {
    //     setLoading(false);
    //     return Toast.show({
    //       type: ALERT_TYPE.WARNING,
    //       title: "Missing Fields",
    //       textBody: "Please enter both mobile number and password.",
    //     });
    //   }

    //   if (mobile === usermobile && password === userpassword) {
    //     Toast.show({
    //       type: ALERT_TYPE.SUCCESS,
    //       title: "Success",
    //       textBody: "Login successfully",
    //     });

    //     router.push("/auth/otp")
    //   } else {
    //     Toast.show({
    //       type: ALERT_TYPE.DANGER,
    //       title: "Failed",
    //       textBody: "Login Failed. Incorrect credentials.",
    //     });
    //     router.push("/auth/otp")
    //   }

    //   setLoading(false); // Stop loading
    // }, 2000); // Simulate a 2-second delay for login processing
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-6">
      <Text className="text-3xl font-bold text-gray-800 mb-6">Welcome Back!</Text>

      {/* Mobile Input */}
      <View className="w-full">
        <Text className="text-lg font-semibold text-gray-700 mb-2">Mobile</Text>
        <TextInput
          className="border border-gray-300 bg-white w-full px-4 py-4 rounded-full shadow-xl"
          placeholder="Enter mobile number"
          keyboardType="numeric"
          value={mobile} // Bind mobile state to TextInput
          onChangeText={setMobile}
        />
      </View>

      {/* Password Input */}
      <View className="w-full mt-4">
        <Text className="text-lg font-semibold text-gray-700 mb-2">Password</Text>
        <TextInput
          className="border border-gray-300 bg-white w-full px-4 py-4 rounded-full shadow-xl"
          placeholder="Enter password"
          secureTextEntry
          value={password} // Bind password state to TextInput
          onChangeText={setPassword} // Update password state on text change
        />

        <Pressable className="mt-4">
          <Text className="text-blue-500 font-semibold text-right">Forgot Password?</Text>
        </Pressable>
      </View>

      {/* Login Button */}
      <Pressable
        className="w-full py-4 mt-6 rounded-full shadow-xl bg-yellow-500"
        onPress={handleLogin} // Handle login press
        disabled={loading} // Disable button while loading
      >
        <Text className="text-center text-black font-bold text-lg">
          {loading ? <ActivityIndicator color="black" /> : "Login"}
        </Text>
      </Pressable>
    </View>
  );
};

export default Login;
