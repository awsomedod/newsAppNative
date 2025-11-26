import { View } from 'react-native';
import InputField from '../InputField';
import { LockClosedIcon, UserIcon } from 'react-native-heroicons/outline';

interface LoginInputsProps {
  identifier: string;
  password: string;
  setIdentifier: (value: string) => void;
  setPassword: (value: string) => void;
}

export default function LoginInputs({
  identifier,
  password,
  setIdentifier,
  setPassword,
}: LoginInputsProps) {
  return (
    <View className="mt-6">
      <InputField
        label="Email or Username"
        icon={UserIcon}
        placeholder="you@example.com or user_name"
        value={identifier}
        onChangeText={setIdentifier}
        autoComplete="username"
        textContentType="username"
      />

      <InputField
        label="Password"
        icon={LockClosedIcon}
        placeholder="••••••••"
        password={true}
        value={password}
        onChangeText={setPassword}
        autoComplete="password"
        textContentType="password"
      />
    </View>
  );
}
