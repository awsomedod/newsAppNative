import { View, Text, Pressable, Image } from 'react-native';

interface SummaryItemProps {
  title: string;
  summary: string;
  image: string;
  onPress: () => void;
}

export default function SummaryItem({
  title,
  summary,
  image,
  onPress,
}: SummaryItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-4 active:scale-[0.98] transition-all duration-200"
    >
      <View className="flex flex-row gap-3 p-4 rounded-lg border border-gray-700 bg-gray-800 items-center">
        <View className="flex-shrink-0">
          <Image
            source={{ uri: image }}
            className="w-20 h-20 rounded-lg object-cover bg-gray-700"
          />
        </View>

        <View className="flex-1 min-w-0">
          <Text className="text-sm font-medium text-white line-clamp-2 leading-tight mb-2">
            {title}
          </Text>

          <Text className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
            {summary}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
