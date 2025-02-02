import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View>
      <Text className="text-2xl text-red-600">Nativewind</Text>
      <Text className="text-3xl">Hello</Text>
      <Button title="Go to Details" onPress={() => router.push("/auth/login")} />
    </View>
  );
}
