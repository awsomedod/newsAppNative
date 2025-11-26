import { Pressable, Text, View, Image, ScrollView } from 'react-native';
import { Summary } from '../types';
import { XMarkIcon } from 'react-native-heroicons/outline';

interface SummaryModalProps {
  summary: Summary;
  setModalVisible: (visible: boolean) => void;
}

export default function SummaryModal({
  summary,
  setModalVisible,
}: SummaryModalProps) {
  const onClose = () => {
    setModalVisible(false);
  };
  return (
    <View className="w-full max-w-3xl transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-gray-800">
      <View className="flex-row items-start justify-between mb-4">
        <Text className="text-lg font-medium leading-6 text-white pr-4">
          News Summary
        </Text>
        <Pressable
          onPress={onClose}
          className="flex-row items-center gap-2 active:bg-gray-700 rounded-full p-2"
        >
          <XMarkIcon size={20} color="#99a1af" />
        </Pressable>
      </View>
      <View className="flex flex-row gap-3 items-start mb-4">
        <View className="flex-shrink-0">
          <Image
            source={{ uri: summary.image }}
            className="w-20 h-20 rounded-lg object-cover bg-gray-700"
          />
        </View>
        <View className="flex-1 min-w-0">
          <Text className="text-xl font-semibold text-white leading-tight">
            {summary.title}
          </Text>
        </View>
      </View>
      <View className="bg-gray-700 rounded-lg p-4">
        <Text className="text-base font-medium text-white mb-3">
          Full Summary
        </Text>

        <ScrollView style={{ maxHeight: 500 }}>
          <View className="p-2">
            <Text className="text-sm text-gray-300">{summary.summary}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
