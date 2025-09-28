import { View } from 'react-native';
import AuthTab from './AuthTab';

interface AuthTabSwitcherProps {
  selected: 'Login' | 'Sign Up';
  onSelectionChange: (selected: 'Login' | 'Sign Up') => void;
}

export default function AuthTabSwitcher({
  selected,
  onSelectionChange,
}: AuthTabSwitcherProps) {
  return (
    <View className="flex-row gap-2 rounded-xl bg-gray-800 w-full">
      {/* Login Tab */}
      <AuthTab
        label="Login"
        isSelected={selected === 'Login'}
        onPress={() => onSelectionChange('Login')}
      />

      {/* Sign Up Tab */}
      <AuthTab
        label="Sign Up"
        isSelected={selected === 'Sign Up'}
        onPress={() => onSelectionChange('Sign Up')}
      />
    </View>
  );
}
