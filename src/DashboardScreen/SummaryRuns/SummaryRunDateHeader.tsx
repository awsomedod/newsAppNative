import { View, Text } from 'react-native';

interface SummaryRunDateHeaderProps {
  dateAndTime: string;
  summariesCount: number;
}

export default function SummaryRunDateHeader({
  dateAndTime,
  summariesCount,
}: SummaryRunDateHeaderProps) {
  return (
    <View className="flex-row items-center gap-2 pb-2 border-b border-gray-700 mb-4">
      <View className="h-2 w-2 rounded-full bg-blue-400" />
      <Text className="text-sm font-semibold text-white">{dateAndTime}</Text>
      <Text className="text-xs text-gray-400">
        {summariesCount > 1
          ? `${summariesCount} summaries`
          : `${summariesCount} summary`}
      </Text>
    </View>
  );
}
