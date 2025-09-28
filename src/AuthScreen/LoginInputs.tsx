import { View } from 'react-native';
import InputField from './InputField';
import { LockClosedIcon, UserIcon } from 'react-native-heroicons/outline';

export default function LoginInputs() {
  return (
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
  );
}
