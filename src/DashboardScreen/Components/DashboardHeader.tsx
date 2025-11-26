import { View, Text } from 'react-native';
import UserProfileMenu from './UserProfile/UserProfileMenu';

interface DashboardHeaderProps {
  /**
   * Username to display
   */
  username: string | undefined;
  /**
   * Email to display in profile dropdown
   */
  email: string | undefined;
  /**
   * Callback when logout is pressed
   */
  onLogout: () => void;
}

/**
 * Dashboard header with title and user profile menu
 */
export default function DashboardHeader({
  username,
  email,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <View className="flex-row justify-between items-center gap-2">
      <Text className="text-2xl font-semibold text-white">Dashboard</Text>
      <UserProfileMenu username={username} email={email} onLogout={onLogout} />
    </View>
  );
}
