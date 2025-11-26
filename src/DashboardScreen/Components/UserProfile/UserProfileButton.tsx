import { Text, Pressable } from 'react-native';
import {
  UserCircleIcon,
  ChevronDownIcon,
} from 'react-native-heroicons/outline';

interface UserProfileButtonProps {
  /**
   * Username to display
   */
  username: string | undefined;
  /**
   * Callback when button is pressed
   */
  onPress: () => void;
}

/**
 * User profile button component
 * Displays user icon, username, and chevron indicator
 */
export default function UserProfileButton({
  username,
  onPress,
}: UserProfileButtonProps) {
  return (
    <Pressable
      className="flex-row items-center gap-2 active:bg-gray-500/50 rounded-full p-1"
      onPress={onPress}
    >
      <UserCircleIcon size={26} color="white" />
      <Text className="text-l text-white">{username || 'User'}</Text>
      <ChevronDownIcon size={15} color="#6a7282" />
    </Pressable>
  );
}
