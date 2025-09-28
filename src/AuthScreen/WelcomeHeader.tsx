import { View, Text } from 'react-native';
import AuthLockIcon from './AuthLockIcon';

export default function WelcomeHeader() {
  return (
    <>
      <AuthLockIcon />
      <View className="mb-5 items-center justify-center">
        <Text className="text-white text-2xl font-semibold">Welcome</Text>
        <Text className="mt-1 text-sm text-gray-400">
          Sign in to your account or create a new one
        </Text>
      </View>
    </>
  );
}
