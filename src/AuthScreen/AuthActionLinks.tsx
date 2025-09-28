import { View, Text, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from './AuthScreen';

export default function AuthActionLinks() {
  const { setSelected } = useContext(AuthContext);
  return (
    <View className="flex-row items-center justify-between mb-5">
      {/* Left side */}
      <View className="flex-row items-center">
        <Text className="text-sm text-gray-400">Create an account?</Text>
        <TouchableOpacity onPress={() => setSelected('Sign Up')}>
          <Text className="text-sm text-blue-400 ml-1">Sign up</Text>
        </TouchableOpacity>
      </View>

      {/* Right side */}
      <TouchableOpacity>
        <Text className="text-sm text-blue-400">Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
}
