import { ActivityIndicator, Text, View } from 'react-native';

/**
 * Loading state for the news sources section
 */
export default function NewsSourcesLoading() {
  return (
    <View className="items-center">
      <ActivityIndicator size="large" color="white" />
      <Text className="text-white text-lg font-medium">Loading...</Text>
    </View>
  );
}
