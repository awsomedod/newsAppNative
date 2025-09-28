import { View, Text, Pressable } from 'react-native';
import { ArrowRightIcon } from 'react-native-heroicons/outline';

export default function AuthActionButton({ text }: { text: string }) {
  return (
    <View className="items-center">
      <Pressable
        className={`
      w-full flex-row items-center justify-center gap-2
      rounded-lg bg-blue-600 px-4 py-2.5
      text-sm font-medium shadow-sm
      transition-colors duration-200
      active:bg-blue-700
    `}
      >
        <Text className="text-white text-sm font-medium">{text}</Text>
        <ArrowRightIcon className="h-4 w-4" color="white" />
      </Pressable>
    </View>
  );
}
