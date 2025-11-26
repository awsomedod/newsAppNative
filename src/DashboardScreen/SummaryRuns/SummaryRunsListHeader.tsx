import { View, Text } from 'react-native';

interface SummaryRunsListHeaderProps {
  count: number;
}

export default function SummaryRunsListHeader({
  count,
}: SummaryRunsListHeaderProps) {
  return (
    <View className="flex-row items-center justify-between pb-4">
      <Text className="text-lg font-semibold text-white">
        Recent Summary Runs
      </Text>
      <Text className="text-sm text-gray-400">{count} runs</Text>
    </View>
  );
}
