import { View } from 'react-native';
import InputField from '../InputField';
import {
  AtSymbolIcon,
  UserIcon,
  LockClosedIcon,
} from 'react-native-heroicons/outline';

interface SignUpInputsProps {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  setEmail: (value: string) => void;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
}

export default function SignUpInputs({
  email,
  username,
  password,
  confirmPassword,
  setEmail,
  setUsername,
  setPassword,
  setConfirmPassword,
}: SignUpInputsProps) {
  return (
    <View className="mt-6">
      {/* Email field */}
      <InputField
        label="Email"
        icon={AtSymbolIcon}
        placeholder="you@example.com"
        keyboardType="email-address"
        autoComplete="email"
        textContentType="emailAddress"
        value={email}
        onChangeText={setEmail}
      />

      {/* Username field */}
      <InputField
        label="Username"
        icon={UserIcon}
        placeholder="your_username"
        autoComplete="username"
        textContentType="username"
        value={username}
        onChangeText={setUsername}
      />

      {/* Password field */}
      <InputField
        label="Password"
        icon={LockClosedIcon}
        placeholder="••••••••"
        password={true}
        autoComplete="new-password"
        textContentType="newPassword"
        value={password}
        onChangeText={setPassword}
      />

      {/* Confirm Password field */}
      <InputField
        label="Confirm password"
        icon={LockClosedIcon}
        placeholder="••••••••"
        password={true}
        autoComplete="new-password"
        textContentType="newPassword"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
    </View>
  );
}
