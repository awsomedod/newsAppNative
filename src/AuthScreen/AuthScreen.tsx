import { View, Text } from 'react-native';
import { LockClosedIcon } from 'react-native-heroicons/outline';

export default function AuthScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="mx-auto mb-3 h-15 w-15 rounded-xl p-2.5 ring-1 ring-blue-600/20 dark:bg-blue-500/10 dark:ring-blue-500/20 items-center justify-center">
        <LockClosedIcon size={40} color="#51a2ff" />
      </View>
      <Text className="text-white text-2xl font-semibold">Welcome</Text>
      <Text className="mt-1 text-sm text-gray-400">
        Sign in to your account or create a new one
      </Text>
    </View>
  );
}
