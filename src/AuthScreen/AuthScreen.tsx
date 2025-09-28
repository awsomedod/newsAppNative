import { View, Text } from 'react-native';
import AuthLockIcon from './AuthLockIcon';
import AuthTabSwitcher from './AuthTabSwitcher';
import InputField from './InputField';
import { useState } from 'react';
import { LockClosedIcon, UserIcon } from 'react-native-heroicons/outline';

export default function AuthScreen() {
  const [selected, setSelected] = useState<'Login' | 'Sign Up'>('Login');
  return (
    <View className="flex-1 items-center justify-center">
      <AuthLockIcon />
      <View className="mb-8 items-center justify-center">
        <Text className="text-white text-2xl font-semibold">Welcome</Text>
        <Text className="mt-1 text-sm text-gray-400">
          Sign in to your account or create a new one
        </Text>
      </View>
      <View className="rounded-2xl border p-6 border-gray-800 bg-gray-900 mx-8">
        <AuthTabSwitcher selected={selected} onSelectionChange={setSelected} />
        <View className="mt-6">
          <InputField
            label="Email or Username"
            icon={UserIcon}
            placeholder="you@example.com or user_name"
          />
          <InputField
            label="Password"
            icon={LockClosedIcon}
            placeholder="••••••••"
            password={true}
          />
        </View>
      </View>
    </View>
  );
}
