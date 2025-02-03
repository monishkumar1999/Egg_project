  import { Stack, usePathname } from "expo-router";
  import { useFonts } from "expo-font";
  import * as SplashScreen from "expo-splash-screen";
  import { useEffect } from "react";
  import { AlertNotificationRoot } from "react-native-alert-notification";
  import BottomTab from "./BottomTab"; // Import BottomTab
  import "../global.css";

  // Prevent splash screen from hiding too early
  SplashScreen.preventAutoHideAsync();

  export default function RootLayout() {
    const pathname = usePathname(); // Get current route
    const [loaded] = useFonts({
      SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    useEffect(() => {
      if (loaded) {
        SplashScreen.hideAsync();
      }
    }, [loaded]);

    if (!loaded) return null;

    // Check if the current route is a login/OTP screen
    const hideBottomTab = pathname.startsWith("/auth/") || pathname === "/login";

    return (
      <AlertNotificationRoot>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="home" />
          <Stack.Screen name="component/customer/addCustomer" />

          <Stack.Screen name="chart" />
          <Stack.Screen name="users" />
          <Stack.Screen name="factory" />
          <Stack.Screen name="analytics" />
          <Stack.Screen name="auth/login" />
          <Stack.Screen name="auth/otp" />
        </Stack>

        {/* Show Bottom Tab only when not on auth screens */}
        {!hideBottomTab && <BottomTab />}
      </AlertNotificationRoot>
    );
  }
