import { View, Text, Pressable } from 'react-native';
import { PlusIcon, GlobeAltIcon } from 'react-native-heroicons/outline';

interface EmptySourcesStateProps {
  onAddSource: () => void;
}

export default function EmptySourcesState({
  onAddSource,
}: EmptySourcesStateProps) {
  return (
    <View className="items-center pb-4">
      <View className="mb-4">
        <GlobeAltIcon size={40} color="white" />
      </View>
      <Text className="text-xl font-semibold text-white mb-2">
        No sources added yet
      </Text>
      <Text className="text-sm text-gray-400 mb-4">
        Add a source to get started
      </Text>

      <Pressable
        className={`
          flex-row items-center justify-center gap-2
          rounded-lg px-4 py-2.5
          text-sm font-medium shadow-sm
          transition-colors duration-200
          bg-blue-600 active:bg-blue-700 opacity-100
        `}
        onPress={onAddSource}
      >
        <PlusIcon size={20} color="white" />
        <Text className="text-white text-lg font-medium">Add Source</Text>
      </Pressable>
    </View>
  );
}
