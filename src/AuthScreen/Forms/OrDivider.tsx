import { View, Text } from 'react-native';

export default function OrDivider({ text }: { text: string }) {
  return (
    <View className="relative my-4">
      {/* Horizontal line */}
      <View className="absolute inset-0 flex-row items-center">
        <View className="w-full border-t border-gray-700" />
      </View>

      {/* Centered "or" */}
      <View className="relative flex-row justify-center">
        <Text className="px-2 text-xs text-gray-400 bg-gray-900">{text}</Text>
      </View>
    </View>
  );
}
