import { View } from 'react-native';
import { LockClosedIcon } from 'react-native-heroicons/outline';

export default function AuthLockIcon() {
  return (
    <View className="mx-auto mb-3 h-15 w-15 rounded-xl p-2.5 ring-1 ring-blue-600/20 dark:bg-blue-500/10 dark:ring-blue-500/20 items-center justify-center">
      <LockClosedIcon size={40} color="#51a2ff" />
    </View>
  );
}

