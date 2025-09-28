import { View } from 'react-native';
import InputField from './InputField';
import {
  AtSymbolIcon,
  UserIcon,
  LockClosedIcon,
} from 'react-native-heroicons/outline';

export default function SignUpInputs() {
  return (
    <View className="mt-6">
      {/* Main signup form */}
      {/* Email field */}
      <InputField
        label="Email"
        icon={AtSymbolIcon}
        placeholder="you@example.com"
        keyboardType="email-address"
        autoComplete="email"
      />

      {/* Username field */}
      <InputField
        label="Username"
        icon={UserIcon}
        placeholder="your_username"
        autoComplete="username"
      />
      <InputField
        label="Password"
        icon={LockClosedIcon}
        placeholder="••••••••"
        password={true}
        autoComplete="new-password"
      />
      <InputField
        label="Confirm password"
        icon={LockClosedIcon}
        placeholder="••••••••"
        password={true}
        autoComplete="new-password"
      />
    </View>
  );
}
