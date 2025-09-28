import { View } from 'react-native';
import InputField from './InputField';
import GoogleSignInButton from './GoogleSignInButton';
import { UserIcon } from 'react-native-heroicons/outline';

export default function GoogleSignUpSection() {
  return (
    <View>
      {/* Google username field */}
      <InputField
        label="Username (for Google sign up)"
        icon={UserIcon}
        placeholder="your_username"
        autoComplete="username"
      />

      {/* Google sign up button */}
      <GoogleSignInButton text="Sign up with Google" />
    </View>
  );
}
