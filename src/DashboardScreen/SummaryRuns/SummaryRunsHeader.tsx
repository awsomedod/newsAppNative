import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { ArrowPathIcon } from 'react-native-heroicons/outline';

interface SummaryRunsHeaderProps {
  refreshDisabled: boolean;
  onRefresh: () => void;
  isGenerating?: boolean;
}

export default function SummaryRunsHeader({
  refreshDisabled,
  onRefresh,
  isGenerating = false,
}: SummaryRunsHeaderProps) {
  return (
    <View className="flex justify-between border-b px-4 py-2 border-gray-700">
      <Text className="text-2xl font-semibold pb-4 text-white">
        Summary Runs
      </Text>

      <Pressable
        onPress={onRefresh}
        className={`
          flex-row items-center justify-center gap-2
          rounded-lg px-4 py-2.5 mb-4
          text-sm font-medium shadow-sm
          transition-colors duration-200 
          ${
            refreshDisabled || isGenerating
              ? 'bg-gray-600 opacity-50'
              : 'bg-blue-600 active:bg-blue-700 opacity-100'
          }
        `}
        disabled={refreshDisabled || isGenerating}
      >
        {isGenerating ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <>
            <ArrowPathIcon size={20} color="white" />
            <Text className="text-white text-lg font-medium">Refresh News</Text>
          </>
        )}
      </Pressable>
      {refreshDisabled && (
        <Text className="text-sm text-gray-400 mb-4 text-center">
          Add sources to generate news summaries
        </Text>
      )}
    </View>
  );
}
