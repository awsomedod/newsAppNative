import { View, Text, Pressable, Dimensions } from 'react-native';
import { ArrowRightOnRectangleIcon } from 'react-native-heroicons/outline';

interface UserProfileDropdownProps {
  /**
   * Email to display
   */
  email: string | undefined;
  /**
   * Callback when logout is pressed
   */
  onLogout: () => void;
  /**
   * Callback to close dropdown
   */
  onClose: () => void;
}

/**
 * Dropdown menu for user profile
 * Shows user email and logout option
 */
export default function UserProfileDropdown({
  email,
  onLogout,
  onClose,
}: UserProfileDropdownProps) {
  return (
    <View
      className="absolute top-full right-0 mt-2 bg-UIBackgroundColor rounded-lg border border-gray-500/50 z-50"
      style={{
        minWidth: Math.max((email?.length ?? 0) * 7 + 40, 120),
        maxWidth: Dimensions.get('window').width * 0.8,
      }}
    >
      <Pressable className="px-3 py-3 items-center" onPress={() => {}}>
        <Text className="text-white">Signed in as</Text>
        <Text className="text-xs text-gray-400">{email || 'User'}</Text>
      </Pressable>

      <View className="border-b border-gray-500/50" />

      <Pressable
        onPress={() => {
          onClose();
          onLogout();
        }}
        className="px-3 py-2 m-1 rounded-lg active:bg-red-500/20 flex-row items-center gap-2"
      >
        <ArrowRightOnRectangleIcon size={20} color="red" />
        <Text className="text-red-600">Logout</Text>
      </Pressable>
    </View>
  );
}
