import { View, Text } from 'react-native';
import { DocumentTextIcon } from 'react-native-heroicons/outline';

export default function EmptySummaryRunsState() {
  return (
    <>
      <View className="mb-4">
        <DocumentTextIcon size={40} color="white" />
      </View>
      <Text className="text-xl font-semibold text-white mb-2">
        No Summary Runs Available
      </Text>
      <Text className="text-sm text-gray-400 mb-4 text-center">
        Summary runs will appear here when they become available.
      </Text>
    </>
  );
}
