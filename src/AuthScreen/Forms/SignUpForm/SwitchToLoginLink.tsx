import { View, Text, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../../AuthScreen';

export default function SwitchToLoginLink() {
  const { setSelected } = useContext(AuthContext);
  return (
    <View className="flex-row items-center justify-center mt-1">
      <Text className="text-sm text-gray-400">Already have an account? </Text>
      <TouchableOpacity onPress={() => setSelected('Login')}>
        <Text className="text-sm text-blue-400">Log in</Text>
      </TouchableOpacity>
    </View>
  );
}
