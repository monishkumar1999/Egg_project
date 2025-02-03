import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function DetailsScreen() {
  const router = useRouter();

  return (
    <View>
      <Text className="text-3xl">Details Page</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}
